import Token from "./../../../../library/help/token";
import VerifyUser from "./../../../../library/verifyUser";
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("permission/todo");


import {getPermissions} from "./permissionsBiz";

//获取所有菜单
//url: 'hhhhh/fff',
export const getTodos = function(ctx, next) {
    
     let userId = "591d605257079155139b7229";
     return getPermissions(userId).then((permissions)=>{
           console.log(permissions)
            return db.find({permissions:{"$in":permissions},isDel:0}).then((todos)=>{
                  console.log(todos);
                  
                  ctx.body = todos;
            })
     })
}

