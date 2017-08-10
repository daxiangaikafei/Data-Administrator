// import Result from "./../../../library/help/result";
import DB from "./../../model/index";


import {each} from "lodash";
import * as moment from "moment";
import Error from "./../../../library/help/error";
const error = new Error("biz/common/findByPageSize");


import {BSON,ObjectID} from "bson";
const bson = new BSON();
import {Types} from "mongoose";

const findByPage = function(searchData,pageInfo,config) {

    let db = new DB(config.path);
    let {pageSize,currentPage} = pageInfo;
    let like = config.like||["id","name"],isId=false;
       
    //模糊查询
    if(searchData.searchKey){
        try {
            Types.ObjectId(searchData.searchKey);
            searchData["_id"] = searchData.searchKey
            isId = true;
        } catch (err) {
            
        }
        if(isId===false){
            let exp = new RegExp(searchData.searchKey);
            let newLike = [];
            like.forEach((value,index)=>{
                newLike.push({[value]:exp})
                return 
            })
            searchData["$or"] = newLike;
        }
        delete searchData.searchKey;
    }
    return db.findByPage(searchData, {} ,{ pageSize: pageSize||10, currentPage: currentPage||1 }).then((data) => {
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