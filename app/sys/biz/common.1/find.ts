import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");

const find = function(ctx,next,config) {

    let db = new DB(config.path);
    let result = new Result();
    let saveData = ctx.query;

    return db.find(saveData).then((data) => {
        each(data, function(one, index) {
            data[index]._doc.createTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

export const findById = function(ctx,next,config) {

    let db = new DB(config.path);
    let result = new Result();
    let id = ctx.params.id;
    

    return db.getModel().findById(id).then((data) => {
        
            data._doc.createTime = moment(data.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data._doc.upTime = moment(data.upTime).format("YYYY-MM-DD HH:mm:ss");
        
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}


export default find

