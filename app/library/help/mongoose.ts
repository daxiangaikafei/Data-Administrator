
import {Types} from "mongoose";
import {BSON,ObjectID} from "bson";
const bson = new BSON();

/**
 * 根据传进来的参数 返回模糊匹配参数
 * @param searchData 
 * @param like 
 */
export const getSearchKeyValue = (searchData,like = ["_id","name"])=>{
    let isId = false;
    if(searchData&&searchData.searchKey){
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
                if(value === "_id") return;
                newLike.push({[value]:exp})
                return 
            })
            searchData["$or"] = newLike;
        }
        delete searchData.searchKey;
    }
    return Object.assign({},searchData||{});
}