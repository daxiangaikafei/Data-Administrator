import * as  Router from "koa-router";
import user from "./biz/userBiz";

import commonRoutes from "./../common/index";
//console.log(commonRoutes)


import apis from "./config";
// const apis =

const router: Router = new Router();
router.prefix("/api/sys");

let baseUrl = "/db/";   
for (let key in apis) {
    let url = baseUrl + apis[key]["prefix"];
    let path = apis[key].path;
    //console.log("path",path)
    apis[key].add && router.post(url + "", (ctx, next) => { return commonRoutes.save(ctx, next, apis[key]) });
    apis[key].remove && router.delete(url + "/:id", (ctx, next) => { return commonRoutes.remove(ctx, next, path) });
    apis[key].up && router.put(url + "/:id", (ctx, next) => { return commonRoutes.up(ctx, next, path) });
    apis[key].find && router.get(url + "/all", (ctx, next) => { return commonRoutes.find(ctx, next, apis[key]) });
    apis[key].findByPage && router.get(url + "", (ctx, next) => { return commonRoutes.findByPage(ctx, next, apis[key]) });
    console.log("url:",url,apis[key].findByPage)//findByPage
    router.get(url + "/info/:id", (ctx, next) => { return commonRoutes.findById(ctx, next, apis[key]) });
}


router.post("/v1/auth/user/login", user.login);
router.post("/v1/user/registered", user.registered);
router.post("/v1/auth/user/isLogin", user.isLogin);
router.get("/v1/auth/user/info", user.getUserInfo);
router.get("/db/auth/user", user.getUsers);
router.get("/v1/auth/user/loginOff", user.loginOff);
router.put("/db/auth/user/up", user.upUser);

import * as menu from "./biz/menuBiz";

router.get("/db/permission/menu", menu.getMenus);
router.get("/v1/permission/menu/all", menu.getMenusByUser);
router.get("/v1/permission/menu/Permissions/:id", menu.getMenuPermissions);

import * as todo from "./biz/todoBiz";

router.get("/v1/permission/todo/all", todo.getTodos);



import * as department from "./biz/departmentBiz";

router.get("/v1/auth/department", department.getList);
router.get("/v1/auth/department/getSelectData", department.getSelectData);

import * as dictionary from "./biz/dictionaryBiz";

router.get("/v1/auth/dictionary/:type", dictionary.getList);
router.get("/v1/auth/dictionary", dictionary.getAll);


import * as permissions from "./biz/permissionsBiz";
router.get("/v1/permission/permissions", permissions.getList);


import * as role from "./biz/roleBiz";

router.get("/v1/auth/role", role.getList);

import * as userGroup from "./biz/userGroupBiz";

router.get("/v1/auth/userGroup", userGroup.getList);

import * as apiBiz from './biz/apiBiz';
router.get("/v1/api/api", apiBiz.getList)

import * as gateway from './biz/gatewayBiz'
//网关相关接口
router.get("/modular/gateway", gateway.getList)
router.post("/modular/gateway", (ctx, next) => { return commonRoutes.save(ctx, next, apis["gateway"]) })
router.put("/modular/gateway/:id", gateway.upItem)
router.delete('/modular/gateway/:id',  (ctx, next) => { return commonRoutes.remove(ctx, next, "modular/gateway") })
router.get("/modular/gateway/info/:id", gateway.getItemById)
router.get("/modular/gateway/list/:channel", gateway.getListByChannel)
router.get("/modular/gateway/redis/push", gateway.pushRedis)

module.exports = router