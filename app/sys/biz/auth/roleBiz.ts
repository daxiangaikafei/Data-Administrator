import Result from "./../../../library/help/result";

import {each,isArray,isObjectLike} from "lodash";
import DB from "./../../model/index";
const db = new DB("auth/role");

// const result = new Result();

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

//获取所有菜单
export const getList = async function(role) {

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"permissions",
            match: { isDel:0},
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }
    return await db.findByPage(role,{},{},populate).then((data:any) => {
                return data;
            }).catch((err) => {
                throw error.set(1, err.message);
            });
}
