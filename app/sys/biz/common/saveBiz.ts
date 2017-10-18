// import Result from "./../../../library/help/result";
import DB from "./../../model/index";



import {isArray,each,isEmpty} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("userBiz");

// import {isArray,each,isEmpty} from "lodash";

//新增
const save = function(saveData,config) {
    let db = new DB(config.path);
    return db.save(saveData).then((data) => {
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })
           
}



export default save