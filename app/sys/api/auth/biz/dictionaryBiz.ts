
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("auth/dictionary");

import {each} from "lodash";


export const getList = function(ctx, next) {
    
     let {type} = ctx.params;
     let result = new Result();
     return db.find({primarykey:type}).sort({"sort":"desc"}).then((data)=>{
        //      //console.log(data);
            ctx.body = result.success(data);
        })

}


export const getAll = function(ctx, next) {
    

     let result = new Result();
     return db.find().then((data)=>{
                let newMap = {};
                data.map((value)=>{
                        let newArray = newMap[value._doc.key]||[];
                        newArray.push(value)
                        newMap[value._doc.key] = newArray;
                })
                ctx.body = result.success(newMap);
        })
}

// export const findBy