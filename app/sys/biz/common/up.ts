import Result from "./../../../library/help/result";
import DB from "./../../model/index";


const each = require("lodash/each");
var moment = require("moment");


    //修改
const up = async function(ctx, next,name:string) {
    let upData = ctx.request.body;
    let db = new DB(name);
    let result = new Result();
     let id = ctx.params.id;
    upData.upBy = ctx.state.userInfo.userId;
    // console.log(upData)
    await db.getModel().findOne({_id:id}).then((doc)=>{
        doc.set(upData);
        doc.save();
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })

    // return db.update(id, upData).then((data) => {
    //     ctx.body = result.success();
    // }).catch((error) => {
    //     ctx.body = result.error(1,error.message);
    // })
}


export default up
// module.exports = {
//     save,remove,find,sort,up
// }