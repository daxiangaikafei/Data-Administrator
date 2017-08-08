
import Result from "./../../../library/help/result";
import Biz from "./../../biz/api/apiBiz";

//获取所有列表
const getList = async function (ctx, next) {
    let result = new Result();
    
    let data = await Biz.getList(ctx.query);
    ctx.body = result.success(data);
}

export default  {
    getList
}