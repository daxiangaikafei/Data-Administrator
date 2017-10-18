import Result from "./../../../library/help/result";
import * as Biz from "./../../biz/modular/gatewayBiz";

export const pushRedis = async (ctx,next)=> {
    let result = new Result();
    let {key} = ctx.params;
    ctx.body = result.success(await Biz.pushRedis());
}
