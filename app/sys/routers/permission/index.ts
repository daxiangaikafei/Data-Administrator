import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys/permission");



import * as menu from "./menu";

router.get("/db/menu", menu.getMenus);
router.get("/v1/menu/all", menu.getMenusByUser);
router.get("/v1/menu/Permissions/:id", menu.getMenuPermissions);



import * as todo from "./todo";

router.get("/v1/todo/all", todo.getTodos);


import * as permissions from "./permissions";

router.get("/v1/permissions", permissions.getList);


export default router;