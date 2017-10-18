import Result from "./../../../library/help/result";
import * as  Biz from "./../../biz/permission/todoBiz";


export const getTodos = async function(ctx, next) {
     let result = new Result();
     let userId = "591d605257079155139b7229";
     let data = Biz.getTodos(userId);
     ctx.body = result.success(data);
}

