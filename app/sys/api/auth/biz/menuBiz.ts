import Token from "./../../../../library/help/token";
import VerifyUser from "./../../../../library/verifyUser";
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("/permission/menu");


import {getPermissions} from "./permissionsBiz";

//获取所有菜单
export const getMenus = function(ctx, next) {
    
     let userId = "591d605257079155139b7229";
     return getPermissions(userId).then((permissions)=>{
           
            return db.find({permissions:{"$in":permissions}}).then((menus)=>{
                 console.log(menus)
                    ctx.body = menus;
            })
     })
}

db.getModel()
.find({"prevId":{$exists:false}})
.populate({
        path:"_id",
        populate:{
                path:"_id",
                model:"Menu",
                populate:{
                path:"_id",
                model:"Menu"
                }
        }
})
.then((data)=>{
        console.log(data);
})