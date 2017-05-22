import * as  Router from "koa-router";
import  user from "./biz/userBiz";

import commonRoutes from "./../common/index";
console.log(commonRoutes)



const apis = {
    branch:{
        name:"branch",
        path:"/auth/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    department:{
        name:"department",
        path:"/auth/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    
    role:{
        name:"role",
         path:"/auth/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    user:{
        name:"user",
         path:"/auth/",
        add:false,
        remove:false,
        up:true,
        find:true
    },
    userGroup:{
        name:"userGroup",
         path:"/auth/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    permissions:{
        name:"permissions",
        path:"/permission/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    todo:{
        name:"todo",
        path:"/permission/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,


        
        find:true
    },
    menu:{
        name:"menu",
        path:"/permission/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
    modular:{
        name:"modular",
        path:"/modular/",
        add:{
            isUse:true,
            key:"name"
        },
        remove:true,
        up:true,
        find:true
    },
}

const router:Router = new Router();
router.prefix("/api/sys");

let baseUrl = "/db/";
for(let key in apis){
    let url = baseUrl+key;
    let path = apis[key].path+key;
    console.log("path",path)
    apis[key].add&&router.post(url+"/add",(ctx,next)=>{return commonRoutes.save(ctx,next,apis[key])});
    apis[key].remove&&router.delete(url+"/remove",(ctx,next)=>{return commonRoutes.remove(ctx,next,path)});
    apis[key].up&&router.post(url+"/up",(ctx,next)=>{return commonRoutes.up(ctx,next,path)});
    apis[key].find&&router.get(url+"/find",(ctx,next)=>{return commonRoutes.find(ctx,next,path)});
    console.log("url:",url+"/add",apis[key].add)
}


router.post("/v1/user/login",user.login);
router.post("/v1/user/registered",user.registered);
router.post("/v1/user/isLogin",user.isLogin);


import * as menu from "./biz/menuBiz";

router.get("/v1/menu/find",menu.getMenus);

import * as todo from "./biz/todoBiz";

router.get("/v1/todo/find",todo.getTodos);

module.exports = router