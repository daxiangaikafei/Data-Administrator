import Token from "./../../../library/help/token";
import VerifyUser from "./../../../library/verifyUser";
import Result from "./../../../library/help/result";
import DB from "./../../model/index"
import RedisData from "./../../../library/help/redisData";


const db = new DB("modular/gateway");
import Error from "./../../../library/help/error";
const error = new Error("roleBiz");


//获取所有列表
export const getList = function (ctx, next) {
    let result = new Result();
    return db.findByPage(ctx.query).then((data) => {
        console.log(data)
        ctx.body = result.success(data)
    })
}

//修改
export const upItem = (ctx, next) => {
    let upData = ctx.request.body;
    let result = new Result();
    let param:any = ctx.params;
    upData.upBy = ctx.state.userInfo.userId;
    return db.update(param.id, upData).then((data) => {
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

export const getItemById = (ctx, next) => {
    let result = new Result();
    let param:any = ctx.params;
    return db.find({_id: param.id}).then(data=>{
        ctx.body = result.success(data[0]);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

export const getListByChannel = (ctx, next) => {
    let result = new Result();
    let param:any = ctx.params;
    return db.findByPage({product: param.channel}).then(data=>{
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

export const pushRedis = (ctx, next) => {
    let result = new Result();
    return db.find({$or:[{isGreatWall: true},{isLogin:false}]}).then(data=>{
        let routes = {}
        data.map(obj => {
            routes[obj.url] = {
                isGreatWall: obj.isGreatWall,
                isLogin: obj.isLogin,
                version: obj.version
            }
        })
        let redisData = new RedisData("localConfig");
        redisData.setProps("gateway.routes", routes,true);
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}