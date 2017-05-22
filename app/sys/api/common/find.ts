import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");

    //查询
const find = function(ctx,next,name) {
    let db = new DB(name);
    let result = new Result();
    let saveData = ctx.query;
    return db.find(saveData).then((data) => {
        each(data, function(one, index) {
            data[index]._doc.creatTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}


export default find

// module.exports = {
//     save,remove,find,sort,up
// }