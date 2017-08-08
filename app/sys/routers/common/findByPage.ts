import Result from "./../../../library/help/result";
import Biz from "./../../biz/common"

const findByPage = async function(ctx,next,config) {

    let result = new Result();
    let saveData = ctx.query;
    let {pageSize,currentPage} = ctx.query;

    ctx.body = result.success(await Biz.findByPage(saveData,{pageSize,currentPage},config));
}


export default findByPage