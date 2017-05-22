import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");

//删除
const remove = function(ctx, next,name:string) {
    let db = new DB(name);
    let result = new Result();
    let data = ctx.query;
    return db.remove(data).then((data) => {
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

export default remove
// module.exports = {
//     save,remove,find,sort,up
// }