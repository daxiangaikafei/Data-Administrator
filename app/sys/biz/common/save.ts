import Result from "./../../../library/help/result";
import DB from "./../../model/index";



var moment = require("moment");

import {isArray,each,isEmpty} from "lodash";

//新增
const save = function(ctx, next,config) {
    let db = new DB(config.path);
    let result = new Result();
    let saveData:any = ctx.request.body;
    saveData.createBy =  ctx.state.userInfo.userId;
    saveData.upBy = ctx.state.userInfo.userId;
    
    let hasProps = true;
    let arrr = config.add===true?[]:config.add.key;
    arrr = isArray(arrr)?arrr:(arrr).split(",");
    let newO:any = {};
 
    each(arrr,function(value,index){
        if(isEmpty(saveData[value])){
            hasProps = false;
            return;
        }
        newO[value] = saveData[value];
    })
    // newO.isDel =0 ;

    if (hasProps) {
        
        
        return db.find(newO).then((data:any) => {
            if (data.length === 0) {
                return db.save(saveData).then((data) => {
                    ctx.body = result.success();
                }).catch((error) => {
                    ctx.body = result.error(1,error.message);
                })
            } else {
                ctx.body = result.error(1,"无法重复创建");
            }
            //ctx.body = result.success();
        }).catch((error) => {
            ctx.body = result.error(1,error.message);
        })
    }
    ctx.body = result.error(1,"缺少参数"+config.name);

    // return db.save(saveData).then((data) => {
    //     ctx.body = result.success();
    // }).catch((error) => {
    //     ctx.body = result.error(1,error.message);
    // })
}



export default save