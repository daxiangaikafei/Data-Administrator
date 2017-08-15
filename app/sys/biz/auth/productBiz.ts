import DB from "./../../model/index";

const db = new DB("auth/product");

import {each} from "lodash";

import Error from "./../../../library/help/error";
const error = new Error("userBiz");

import * as mongooseHelp from "./../../../library/help/mongoose";

export const getList = function(product,like?:any) {
    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"departments",
            model: 'Department',
            select:"name"
        }).populate({
            path: "prevId",
            model: "Product",
            select: "name",
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }
    let newData = mongooseHelp.getSearchKeyValue(product,like)
    return db.findByPage(newData, {}, {}, populate).then((data:any) => {
                return data;
            }).catch((err) => {
                 throw error.set(1, err.message);
            });
}