import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");


    //修改
const up = function(ctx, next,name:string) {
    let upData = ctx.request.body;
    let db = new DB(name);
    let result = new Result();
    upData.upBy = ctx.state.userInfo.userId;
    console.log(upData)
    return db.update(upData._id, upData).then((data) => {
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}


export default up
// module.exports = {
//     save,remove,find,sort,up
// }