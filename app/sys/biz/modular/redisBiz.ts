import redis from "./../../../library/help/redis";
import RedisData from "./../../../library/help/redisData";
import Result from "./../../../library/help/result";

import * as _ from "lodash";

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

/**
 * 获取数据
 * @param key 
 */
export const getData = async (key)=>{
    let info = await redis.get(key),data;
    try{
        data = JSON.parse(info);
    }catch(err){
        data = info;
    }
    return data;
}

/**
 * 更新数据
 * @param key 关键字
 * @param props name.xx.aa
 * @param data any
 */
export const upData = async (key,props:string,data)=>{

    let redisData = new RedisData(key);
    try{
        data = data.replace(/[']/g,"\"");
        await redisData.setProps(props,JSON.parse(data));
    }catch(err){
        await redis.set(key,data);
    }

    return await getData(key);
}

/**
 * 保存数据
 * @param key 关键字
 * @param data any
 */
export const saveData = async (key,data)=>{
    try{
        data = data.replace(/[']/g,"\"");
        await redis.set(key,JSON.parse(data));
    }catch(err){
        await redis.set(key,data);
    }
    return await getData(key);
}