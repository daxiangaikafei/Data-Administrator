import redis from "./../../../library/help/redis";
import RedisData from "./../../../library/help/redisData";
import Result from "./../../../library/help/result";

import {isObject} from "lodash";


export const getData = async (ctx,next)=>{
    let result = new Result();
    
    let {key} = ctx.params;
    let info = await redis.get(key),data;
    try{
        data = JSON.parse(info);
    }catch(err){
        data = info;
    }
    // let data = JSON.parse(await redis.get(key))||undefined;
    ctx.body = result.success(data);
}

export const upData = async (ctx,next)=>{
    let result = new Result();

    let {key} = ctx.params;
    let params = ctx.request.body;
    let redisData = new RedisData(key),data;
    if(params.key){
         data  = await redisData.setProps(params.key,params.data);
    }else{
        await redis.set(key,params.data);
    }
   

    ctx.body = result.success(data);
}

export const saveData = async (ctx,next)=>{
    let result = new Result();
    let params = ctx.request.body;
    let {key} = ctx.params;
    let data = redis.set(this.key, JSON.stringify(params));
    ctx.body = result.success(data);
}