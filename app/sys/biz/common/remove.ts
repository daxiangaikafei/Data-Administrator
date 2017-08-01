import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");

//删除
const remove = function(ctx, next,name:string) {
    let db = new DB(name);
    let result = new Result();
    let param:any = ctx.params;//upBy = ctx.state.userInfo.userId;
    return db.remove(param.id,{upBy:ctx.state.userInfo.userId}).then((data) => {
        ctx.body = result.success(param.id);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })

    
}

export default remove
// module.exports = {
//     save,remove,find,sort,up
// }