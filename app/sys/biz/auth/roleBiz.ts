import Result from "./../../../library/help/result";

import {each,isArray,isObjectLike} from "lodash";
import DB from "./../../model/index";
const db = new DB("auth/role");


// const result = new Result();

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

import * as mongooseHelp from "./../../../library/help/mongoose";
import config from "../../routers/common/config";

//获取所有菜单
export const getList = async function(role) {

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"permissions",
            match: { isDel:0},
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }

    //模糊查询
    let like = config["auth/role"].like;
    role = mongooseHelp.getSearchKeyValue(role, like)

    return await db.findByPage(role,{},{},populate).then((data:any) => {
                return data;
            }).catch((err) => {
                throw error.set(1, err.message);
            });
}
