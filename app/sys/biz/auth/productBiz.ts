import DB from "./../../model/index";

const db = new DB("auth/product");

import {each} from "lodash";

import Error from "./../../../library/help/error";
const error = new Error("userBiz");

export const getList = function(product) {
    
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
    return db.findByPage(product, {}, {}, populate).then((data:any) => {
                return data;
            }).catch((err) => {
                 throw error.set(1, err.message);
            });
}