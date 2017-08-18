import DB from "./../../model/index";

const db = new DB("auth/department");

import {each} from "lodash";

import Error from "./../../../library/help/error";
const error = new Error("userBiz");

import * as mongooseHelp from "./../../../library/help/mongoose";
import config from "../../routers/common/config";

export const getList = function(department) {
    
    //  let {id} = ctx.params;
        
    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"branchId",
            model: 'Branch',
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }

    //模糊查询
    let like = config["auth/department"].like;
    department = mongooseHelp.getSearchKeyValue(department, like)

    return db.findByPage(department,{},{},populate).then((data:any) => {
                // ctx.body = result.success(data);
                return data;
            }).catch((err) => {
                 throw error.set(1, err.message);
                // ctx.body = result.error(1,error.message);
            });

} 

import {getAll} from "./branchBiz";

export const getSelectData = function(){
    
    return Promise.all([getAll(),db.getModel().find()]).then((results)=>{
        let branchs = results[0];
        let departments = results[1];
        let departmentsMap = {};
        each(departments,function(value,index){
            value = JSON.parse(JSON.stringify(value));
            // departmentsMap[value._doc._id] = value._doc;
            let newArray = departmentsMap[value.branchId]||[];
            newArray.push(value);
            //console.log("bracnhId",value)
            departmentsMap[value.branchId] = newArray;
        })
        let newA = [];
         each(branchs,function(value,index){
            value = JSON.parse(JSON.stringify(value));
            value.departments = departmentsMap[value._id];
            newA.push(value)
            return value;
        });
        return newA;
        // ctx.body = result.success(newA);
    })
}