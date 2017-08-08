import Result from "./../../../library/help/result";
import * as Biz from "./../../biz/auth/dictionaryBiz";

export const getList = async function (ctx, next) {

    let {type} = ctx.params;
    let result = new Result();

    let data = await Biz.getList({
        primarykey: type
    }, {"sort": "desc"});
    ctx.body = result.success(data);

}

export const getAll = async function (ctx, next) {
    let result = new Result();
    let data = await Biz.getAll();
    ctx.body = result.success(data);
}

// export const findBy