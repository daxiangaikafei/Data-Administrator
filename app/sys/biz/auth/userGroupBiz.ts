import Result from "./../../../library/help/result";

import {each,isArray,isObjectLike} from "lodash";
import DB from "./../../model/index";
const db = new DB("auth/userGroup");

// const result = new Result();

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

import * as mongooseHelp from "./../../../library/help/mongoose";
import config from "../../routers/common/config";

//
export const getList = function(userGroup) {

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"roles",
            match: { isDel:0},
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }

    //模糊查询
    let like = config["auth/userGroup"].like;
    userGroup = mongooseHelp.getSearchKeyValue(userGroup, like)

    return db.findByPage(userGroup,{},{},populate).then((data:any) => {
                // ctx.body = result.success(data);
                return data;
            }).catch((err) => {
                 throw error.set(1, err.message);
                // ctx.body = result.error(1,error.message);
            });
}
//getPermissions();