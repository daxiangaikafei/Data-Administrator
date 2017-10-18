
import DB from "./../../model/index";

const db = new DB("auth/dictionary");

import {each} from "lodash";
import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

export const getList = function(dictionary, sort={"sort":"desc"}) {
     return db.find(dictionary).sort(sort).then((data)=>{
            return data;
        }).catch((err) => {
        throw error.set(1, err.message);
    });
}


export const getAll = function() {
    
     return db.find().then((data)=>{
                let newMap = {};
                data.map((value)=>{
                        let newArray = newMap[value._doc.key]||[];
                        newArray.push(value)
                        newMap[value._doc.key] = newArray;
                })
                return newMap
                // ctx.body = result.success(newMap);
        }).catch((err) => {
        throw error.set(1, err.message);
    });
}

// export const findBy