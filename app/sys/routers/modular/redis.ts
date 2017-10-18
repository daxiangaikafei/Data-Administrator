import Result from "./../../../library/help/result";
import * as Biz from "./../../biz/modular/redisBiz";

export const getData = async (ctx,next)=>{
    let result = new Result();
    let {key} = ctx.params;
    ctx.body = result.success(await Biz.getData(key));
}

export const upData = async (ctx,next)=>{
    let result = new Result();

    let {key} = ctx.params;
    let params = ctx.request.body;
    ctx.body = result.success(await Biz.upData(key,params.key,params.data));
}

export const saveData = async (ctx,next)=>{
    let result = new Result();
    let {key} = ctx.params;
    let params = ctx.request.body;
    ctx.body = result.success(await Biz.saveData(key,params));
}