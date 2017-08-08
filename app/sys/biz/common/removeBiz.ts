// import Result from "./../../../library/help/result";
import DB from "./../../model/index";


import {each} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("userBiz");

//删除
const remove = function(id,userInfo,name:string) {
    let db = new DB(name);
    
    return db.remove(id,{upBy:userInfo.userId}).then((data) => {
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })

    
}

export default remove