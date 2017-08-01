import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys");


import user from "./../../biz/auth/userBiz";

router.post("/v1/auth/user/login", user.login);
router.post("/v1/user/registered", user.registered);
router.post("/v1/auth/user/isLogin", user.isLogin);
router.get("/v1/auth/user/info", user.getUserInfo);
router.get("/db/auth/user", user.getUsers);
router.get("/v1/auth/user/loginOff", user.loginOff);
router.put("/db/auth/user/up", user.upUser);


export default router;