import * as  Router from "koa-router";
import  user from "./biz/userBiz";

import commonRoutes from "./../common/index";
console.log(commonRoutes)



const apis = {
    branch:{
        name:"branch",
        path:"auth/branch",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    department:{
        name:"department",
        path:"auth/department",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    
    role:{
        name:"role",
         path:"auth/role",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:false
    },
    user:{
        name:"user",
         path:"auth/user",
        add:false,
        remove:true,
        up:false,
        find:false,
        findByPage:false
    },
    userGroup:{
        name:"userGroup",
         path:"auth/userGroup",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    dictionary:{
        name:"dictionary",
        path:"auth/dictionary",
        add:{
            key:["name","primarykey"]
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    permissions:{
        name:"permissions",
        path:"permission/permissions",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    todo:{
        name:"todo",
        path:"permission/todo",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
    menu:{
        name:"menu",
        path:"permission/menu",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:false,
        findByPage:true
    },
    modular:{
        name:"modular",
        path:"modular/modular",
        add:{
            key:"name"
        },
        remove:true,
        up:true,
        find:true,
        findByPage:true
    },
}

const router:Router = new Router();
router.prefix("/api/sys");

let baseUrl = "/db/";
for(let key in apis){
    let url = baseUrl+key;
    let path = apis[key].path;
    console.log("path",path)
    apis[key].add&&router.post(url+"/add",(ctx,next)=>{return commonRoutes.save(ctx,next,apis[key])});
    apis[key].remove&&router.delete(url+"/:id",(ctx,next)=>{return commonRoutes.remove(ctx,next,path)});
    apis[key].up&&router.put(url+"/up",(ctx,next)=>{return commonRoutes.up(ctx,next,path)});
    apis[key].find&&router.get(url+"/find",(ctx,next)=>{return commonRoutes.find(ctx,next,apis[key])});
    apis[key].findByPage&&router.get(url+"/findByPage",(ctx,next)=>{return commonRoutes.findByPage(ctx,next,apis[key])});
    console.log("url:",url+"/add",apis[key].add)//findByPage
}


router.post("/v1/user/login",user.login);
router.post("/v1/user/registered",user.registered);
router.post("/v1/user/isLogin",user.isLogin);
router.get("/v1/user/",user.getUserInfo);
router.get("/db/user/findByPage",user.getUsers);
router.get("/v1/user/loginOff",user.loginOff);
router.put("/db/user/up",user.upUser);

import * as menu from "./biz/menuBiz";

router.get("/db/menu/findByPage",menu.getMenus);
router.get("/v1/menu/find",menu.getMenusByUser);
router.get("/v1/menu/Permissions/:id",menu.getMenuPermissions);

import * as todo from "./biz/todoBiz";

router.get("/v1/todo/find",todo.getTodos);



import * as department from "./biz/departmentBiz";

router.get("/v1/department/findByPage",department.getList);
router.get("/v1/department/getSelectData",department.getSelectData);

import * as dictionary from "./biz/dictionaryBiz";

router.get("/v1/dictionary/:type",dictionary.getList);
router.get("/v1/dictionary",dictionary.getAll);


import * as permissions from "./biz/permissionsBiz";
router.get("/v1/permissions/findByPage",permissions.getList);


import * as role from "./biz/roleBiz";

router.get("/v1/role/findByPage",role.getList);

import * as userGroup from "./biz/userGroupBiz";

router.get("/v1/userGroup/findByPage",userGroup.getList);

module.exports = router