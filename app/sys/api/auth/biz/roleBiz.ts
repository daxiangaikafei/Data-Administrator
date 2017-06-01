import Result from "./../../../../library/help/result";

import {each,isArray,isObjectLike} from "lodash";
import DB from "./../../../model/index";
const db = new DB("auth/role");

const result = new Result();




//获取所有菜单
export const getList = function(ctx, next) {

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"permissions",
            match: { isDel:0},
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }
    return db.findByPage(ctx.query,{},{},populate).then((data:any) => {
                ctx.body = result.success(data);
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            });
}
//getPermissions();