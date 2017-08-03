import redis from "./../../../library/help/redis";
import RedisData from "./../../../library/help/redisData";
import Result from "./../../../library/help/result";

import * as _ from "lodash";


export const getData = async (ctx,next)=>{
    let result = new Result();
    let {key} = ctx.params;
    ctx.body = result.success(await getRedisData(key));
}

const getRedisData = async (key)=>{
    let info = await redis.get(key),data;
    try{
        data = JSON.parse(info);
    }catch(err){
        data = info;
    }
    return data;
}

export const upData = async (ctx,next)=>{
    let result = new Result();

    let {key} = ctx.params;
    let params = ctx.request.body;
    let redisData = new RedisData(key),data;
    
    try{
        params.data = params.data.replace(/[']/g,"\"");
        await redisData.setProps(params.key,JSON.parse(params.data));
    }catch(err){
        await redis.set(key,params.data);
    }
    // if(params.key&&_.isObjectLike(params.data)){
    //      data  = await redisData.setProps(params.key,params.data);
    // }else{
    //     await redis.set(key,params.data);
    //     // data = await redis.get(key);
    // }
    ctx.body = result.success(await getRedisData(key));
}

export const saveData = async (ctx,next)=>{
    let result = new Result();
    let {key} = ctx.params;
    let params = ctx.request.body;
    try{
        params.data = params.data.replace(/[']/g,"\"");
        await redis.set(key,JSON.parse(params.data));
    }catch(err){
        await redis.set(key,params.data);
    }
    ctx.body = result.success(await getRedisData(key));
}