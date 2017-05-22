import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("pkRoleModular");
const result = new Result();
const each = require("lodash/each");
var moment = require("moment");

//新增
const save = function(ctx, next) {

    let saveData:any = ctx.request.fields;
    saveData.creatTime = moment();
    saveData.creatBy =  "---";

    if (saveData.name && saveData.name != "") {
        return db.find({ name: saveData.name }).then((data:any) => {
            if (data.length === 0) {
                return db.save(saveData).then((data) => {
                    ctx.body = result.success();
                }).catch((error) => {
                    ctx.body = result.error(1,error.message);
                })
            } else {
                ctx.body = result.error(1,"无法重复创建");
            }
            //ctx.body = result.success();
        }).catch((error) => {
            ctx.body = result.error(error.message);
        })
    }
    return db.save(saveData).then((data) => {
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(error.message);
    })
}


//删除
const remove = function(ctx, next) {

        let data = ctx.query;
        return db.remove(data).then((data) => {
            ctx.body = result.success();
        }).catch((error) => {
            ctx.body = result.error(1,error.message);
        })
    }
    //修改
const up = function(ctx, next) {
        let upData = ctx.request.fields;

        return db.update(upData.id, upData).then((data) => {
            ctx.body = result.success();
        }).catch((error) => {
            ctx.body = result.error(1,error.message);
        })
    }
    //查询
const find = function(ctx, next) {

    let saveData = ctx.query; //.sort({"likes":-1})
    // let sort = {"_id": "desc"};
    // if (saveData.asc === true) {

    // }
    return db.find(saveData).then((data) => {
        //console.log("查询Wie", data);
        each(data, function(one, index) {
            data[index]._doc.creatTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.time = moment(one.time).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");

            delete data[index]._doc.isDel;
            delete data[index]._doc.upTime;
        })
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}

const sort = function(ctx, next) {
    let saveData = ctx.query;
    let sort = { type: "asc", sort: "asc", };

    return db.find(saveData, sort).then((data) => {
        each(data, function(one, index) {
            data[index]._doc.creatTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.time = moment(one.time).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
            delete data[index]._doc.isDel;
            //delete data[index]._doc.upTime;
        })
        ctx.body = result.success(data);
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })
}


export default  {
    save,remove,find,sort,up
}