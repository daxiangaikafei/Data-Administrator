
import DB from "./../../model/index"
import RedisData from "./../../../library/help/redisData";

import Error from "./../../../library/help/error";
const error = new Error("api/apiBiz");

const db = new DB("api/api");

import * as mongooseHelp from "./../../../library/help/mongoose";
import config from "../../routers/common/config";

//获取所有列表
const getList =  function (apiInfo) {
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"productId",
            select:"name",
            match: { isDel:0}
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }

    //路由状态查询
    if(apiInfo && apiInfo.apiSetting){
        let temp = apiInfo.apiSetting.split("_");
        if(temp.length === 2){
            apiInfo["todos." + temp[0]] = temp[1] === "1" ? true : false;
        }
        delete apiInfo.apiSetting;
    }

    //模糊查询
    let like = config["api/api"].like;
    apiInfo = mongooseHelp.getSearchKeyValue(apiInfo, like)

    return db.findByPage(apiInfo, {},{}, populate).then((data) => {
        return data;
    }).catch((err)=>{
        throw error.set(1, err.message);
    })
}

const pushRedis = function(){
    return db.find({$or:[{"todos.isGreatWall": true, "todos.isLogin": false}]}).then(data=>{
        let routes = {}
        data.map(obj => {
            routes[obj.url] = {
                isGreatWall: obj.todos.isGreatWall,
                isLogin: obj.todos.isLogin,
                isUse: obj.todos.isUse,
                isRouter: obj.todos.isRouter,
                version: obj.version
            }
        })
        let redisData = new RedisData("localConfig");
        return redisData.setProps("gateway.routes", routes, true);
    }).catch((err) => {
        return error.set(1, err.message); 
    })
}

export default  {
    getList,
    pushRedis
}