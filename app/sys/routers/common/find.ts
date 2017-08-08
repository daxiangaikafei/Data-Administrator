import Result from "./../../../library/help/result";

import Biz from "./../../biz/common"

export const find = async function(ctx,next,config) {

   
    let result = new Result();
    let queryData = ctx.query;
    ctx.body = result.success(await Biz.find(queryData,config));
}

export const findById = async function(ctx,next,config) {

    let result = new Result();
    let id = ctx.params.id;
    ctx.body = result.success(await Biz.findById(id,config));
}


export default find

