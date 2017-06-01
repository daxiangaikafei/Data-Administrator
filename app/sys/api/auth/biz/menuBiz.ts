import Token from "./../../../../library/help/token";
import VerifyUser from "./../../../../library/verifyUser";
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("permission/menu");


import {getPermissions} from "./permissionsBiz";
let verifyUser = new VerifyUser();

//获取用户权限
export const getMenusByUser = function(ctx, next) {

     let result = new Result();

   
        // console.log(userInfo)
        // let userId = "592f722aee8b265e8287f1af";
        return getPermissions(ctx.userId).then((permissions)=>{
                
                return db.find({permissions:{"$in":permissions},isDel:0}).sort({"sort":"desc"}).then((menus)=>{
                        console.log(menus)
                        ctx.body = result.success(buildMenuChild(menus)); 
                })
        })
    
     
}

//获取所有菜单
export const getMenus = function(ctx, next) {

     let result = new Result();
     
        return db.findByPage(ctx.query).then((menus)=>{
                console.log(menus)
                ctx.body = result.success(menus);
        })
}
import {each} from "lodash";

let buildMenuChild = function (menus:any){
        // if(menus)
        //console.log(JSON.parse(JSON.stringify(menus)));
        menus = JSON.parse(JSON.stringify(menus));
        // return ""
        let parents = [];
        let chilsMaps = {};
        menus.map(function(value,index){
                //value = value._doc;
                if(value.prevId&&value.prevId!=""){
                        let newArray = chilsMaps[value.prevId]||[];
                        newArray.push(value);
                        chilsMaps[value.prevId] = newArray;
                }else{
                        parents.push(value);
                } 
        });
        
        each(chilsMaps,function(value,key){
                each(value,function(valued,index){
                        if(chilsMaps[valued._id]){
                                valued.childrens = chilsMaps[valued._id];
                                delete chilsMaps[valued._id];
                        }
                })
                // return value;
        })

        each(parents,function(value,index){
                value.childrens = chilsMaps[value._id]
        })
        return parents;
}
 var getChildsById = function(id,childrens){
        if(!childrens||childrens.length===0){
                return false;
        }
        return childrens[id];
}



//获取所有菜单
export const getMenuPermissions = function(ctx, next) {
    
     let {id} = ctx.params;
     let result = new Result();
     return db.getModel().findOne({_id: id,isDel:0}).populate({
                path:"permissions"
            }).then((data)=>{
                console.log(data);
                ctx.body = result.success(data.permissions);
            })

}
