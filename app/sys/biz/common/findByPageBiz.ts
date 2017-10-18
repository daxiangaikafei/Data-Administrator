// import Result from "./../../../library/help/result";
import DB from "./../../model/index";


import {each} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("biz/common/findByPageSize");

import * as mongooseHelp from "./../../../library/help/mongoose";


const findByPage = function(searchData,pageInfo,config) {

    let db = new DB(config.path);
    let {pageSize,currentPage} = pageInfo;
    //模糊查询
    let like = config.like;
    let newData = mongooseHelp.getSearchKeyValue(searchData,like)
    

    
    return db.findByPage(newData, {} ,{ pageSize: pageSize||10, currentPage: currentPage||1 }).then((data) => {
        each(data.result, function(one, index) {
            one._doc.createTime = moment(one.createTime).format("YYYY-MM-DD HH:mm:ss");
            one._doc.upTime = moment(one.upTime).format("YYYY-MM-DD HH:mm:ss");
        })
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    })
}


export default findByPage