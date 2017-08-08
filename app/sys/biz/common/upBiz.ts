// import Result from "./../../../library/help/result";
import DB from "./../../model/index";

import {isArray,each,isEmpty} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("userBiz");



    //修改
const up = async function(id,upData,name:string) {
    let db = new DB(name);
    await db.getModel().findOne({_id:id}).then((doc)=>{
        doc.set(upData);
        doc.save();
        return true
    }).catch((err) => {
        throw error.set(1, err.message);
    })
}


export default up;