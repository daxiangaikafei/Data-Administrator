
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("auth/department");

import {each} from "lodash";

export const getList = function(ctx, next) {
    
     let {id} = ctx.params;
        let result = new Result();

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"branchId",
            model: 'Branch',
            select:"name"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }
    return db.findByPage(ctx.query,{},{},populate).then((data:any) => {
                ctx.body = result.success(data);
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            });

} 

import {getAll} from "./branchBiz";

export const getSelectData = function(ctx,next){
    let result = new Result();
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
        ctx.body = result.success(newA);
    })
}