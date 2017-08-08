
import DB from "./../../model/index"
import RedisData from "./../../../library/help/redisData";

import Error from "./../../../library/help/error";
const error = new Error("api/apiBiz");

const db = new DB("api/api");


//获取所有列表
const getList =  function (apiInfo) {
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"productId",
            select:"name",
            match: { isDel:0}
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }


    return db.findByPage(apiInfo, {},{}, populate).then((data) => {
        return data;
    }).catch((err)=>{
        throw error.set(1, err.message);
    })
}

export default  {
    getList
}