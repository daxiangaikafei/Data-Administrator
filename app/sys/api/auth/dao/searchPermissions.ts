import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";


const result = new Result();
const each = require("lodash/each");
var moment = require("moment");



const db_branch = new DB("/auth/branch");
const db_department = new DB("/auth/department");
const db_role = new DB("/auth/role");
const db_user = new DB("/auth/user");
const db_userGroup = new DB("/auth/userGroup");

const db_permissions = new DB("/permission/permissions");
const db_menu = new DB("/permission/menu");
const db_todo= new DB("/permission/todo");

export var findUserByPerssions = function(userId:string){
    return new Promise((resolve,reject)=>{
        db_user.getModel()
            .findOne({_id: userId})
            .populate({
                path:"userGroups",
                populate:{
                    path:"roles",
                    model:"Role",
                    populate:{
                        path:"permissions",
                        model:"Permissions"
                    }
                }
            })
            .then((data) => {
                resolve(data);
                // console.log("data", data.roles[0]);
                // console.log("data", data.roles[0].modular[0].permissions);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
        
    })
}



// db_user.getModel()
//             .findOne({_id: "591d605257079155139b7229"})
//             .populate({
//                 path:"userGroups",
//                 populate:{
//                     path:"roles",
//                     model:"Role",
//                     populate:{
//                         path:"permissions",
//                         model:"Permissions"
//                     }
//                 }
//             })
           
//             .then((data) => {
                
//                 console.log("data", data);
//                 console.log("data", data.userGroups[0].roles[0]);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 // reject(error);
//             });




