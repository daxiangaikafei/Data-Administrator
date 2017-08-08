import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");

const findByPage = function(ctx,next,config) {

    let db = new DB(config.path);
    let result = new Result();
    let saveData = ctx.query;
    let {pageSize,currentPage} = ctx.query;
    return db.findByPage(saveData, {} ,{ pageSize: pageSize||10, currentPage: currentPage||1 }).then((data) => {
        each(data.result, function(one, index) {
            one._doc.createTime = moment(one.createTime).format("YYYY-MM-DD HH:mm:ss");
            one._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}


export default findByPage