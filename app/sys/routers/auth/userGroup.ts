
import Result from "./../../../library/help/result";
import * as Biz from "./../../biz/auth/userGroupBiz";

export const getList = async function(ctx, next) {
    let result = new Result();
    let data = await Biz.getList(ctx.query);
    ctx.body = result.success(data);
} 