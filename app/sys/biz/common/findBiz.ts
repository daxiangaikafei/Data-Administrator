// import Result from "./../../../library/help/result";
import DB from "./../../model/index";


// const each = require("lodash/each");

import {each} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("common/findBiz");

export const find = function(saveData,config) {
    let db = new DB(config.path);
    return db.find(saveData).then((data) => {
        each(data, function(one, index) {
            data[index]._doc.createTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })
}

export const findById = function(id,config) {

    let db = new DB(config.path);
    return db.getModel().findById(id).then((data) => {
        if(data===null){
            throw error.set(1, "没有这条数据"+id);
        }
        data._doc.createTime = moment(data.creatTime).format("YYYY-MM-DD HH:mm:ss");
        data._doc.upTime = moment(data.upTime).format("YYYY-MM-DD HH:mm:ss");
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })
}


export default find

