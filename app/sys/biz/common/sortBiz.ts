// import Result from "./../../../library/help/result";
import DB from "./../../model/index";

import {isArray,each,isEmpty} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("userBiz");


const sort = function(data,name :string) {
    let db = new DB(name);
    return db.find(data).then((data) => {
        each(data, function(one, index) {
            data[index]._doc.creatTime = moment(one.creatTime).format("YYYY-MM-DD HH:mm:ss");
            data[index]._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })
}

export default sort
// module.exports = {
//     save,remove,find,sort,up
// }