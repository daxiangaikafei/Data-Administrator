import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys");



import * as menu from "./menu";

router.get("/db/permission/menu", menu.getMenus);
router.get("/v1/permission/menu/all", menu.getMenusByUser);
router.get("/v1/permission/menu/Permissions/:id", menu.getMenuPermissions);



import * as todo from "./todo";

router.get("/v1/permission/todo/all", todo.getTodos);


import * as permissions from "./permissions";

router.get("/v1/permission/permissions", permissions.getList);


export default router;