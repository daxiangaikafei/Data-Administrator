import Result from "./../../../library/help/result";
import Biz from "./../../biz/common"


const sort = async function(ctx, next,name :string) {
    let queryData = ctx.query;
    let result = new Result();
    ctx.body = result.success(await Biz.sort(queryData,name));
}

export default sort