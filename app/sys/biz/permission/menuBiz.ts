import Token from "./../../../library/help/token";
import VerifyUser from "./../../../library/verifyUser";
// import Result from "./../../../library/help/result";
import DB from "./../../model/index";

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");


const db = new DB("permission/menu");

import * as _ from "lodash";
import {getPermissions} from "./permissionsBiz";
let verifyUser = new VerifyUser();


/**
 * 获取当前用户的所有菜单
 * @param userInfo 
 */
export const getMenusByUser = function(userInfo={userId:""}) {

        return getPermissions(userInfo.userId).then((permissions)=>{
                return db.getModel().find({permissions:{"$in":permissions},isDel:0}).sort({sort:"asc"}).then((menus)=>{
                        
                        return buildMenuChild(menus);
                }).catch((err) => {
                        throw error.set(1, err.message);
                });
        });
}

//获取所有菜单
export const getMenus = function(menu) {
        return db.findByPage(menu).then((menus)=>{
                return menus;
        }).catch((err) => {
                throw error.set(1, err.message);
        });
}





//获取所有菜单
export const getMenuPermissions = function(id) {
    
 
     return db.getModel().findOne({_id: id,isDel:0}).populate({
                path:"permissions"
            }).then((data)=>{
                return data;
            }).catch((err) => {
                throw error.set(1, err.message);
           });

}



let buildMenuChild = function (menus:any){
        // if(menus)
        ////console.log(JSON.parse(JSON.stringify(menus)));
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
        // each(chilsMaps,function(value,key){
        //         each(value,function(valued,index){
        //                 if(chilsMaps[valued._id]){
        //                         valued.childrens = chilsMaps[valued._id];
        //                         delete chilsMaps[valued._id];
        //                         return value
        //                 }
        //         })
        //         return value
        // })


        // var forEnd = function(maps){
        //         each(maps,function(value,key){
        //                 each(value,function(valued,index){
        //                         if(maps[valued._id]){
        //                                 valued.childrens = maps[valued._id];
        //                                 delete chilsMaps[valued._id];
        //                         }
        //                 })
        //                 // return value;
        //         })
        //         if(_.size(chilsMaps)!==_.size(parents)){
        //                 forEnd(maps);
        //         }
        // }
        

        // each(parents,function(value,index){
        //         value.childrens = chilsMaps[value._id]
        // })

        let newA= [],newM = [];

        

        function forEnd(parent,maps){
                let map = {};
                // 592fe5e49e15aa47aa70a127  prevId 592fb06af11f4783031255a5
                //console.log("id",parent)
                _.each(parent,function(value,index){
                        if(maps[value._id]){
                                let children = forEnd( maps[value._id],maps);
                                value.childrens = children;
                                
                        }
                })
                return parent;
        }
        let a = forEnd(parents,chilsMaps);

        return a;
}

 var getChildsById = function(id,childrens){
        if(!childrens||childrens.length===0){
                return false;
        }
        return childrens[id];
}