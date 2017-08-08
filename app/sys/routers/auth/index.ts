import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys/auth");


// import user from "./../../auth/user"; /api/sys/v1/auth/user
import user from "./user";



router.post("/v1/user/login", user.login);
router.post("/v1/user/registered", user.registered);
router.post("/v1/user/isLogin", user.isLogin);
router.get("/v1/user/info", user.getUserInfo);
router.get("/db/user", user.getUsersByPage);
router.get("/db/user/all", user.getUsers);
router.get("/v1/user/loginOff", user.loginOff);
router.put("/db/user/:id", user.upUser);



import * as department from "./department";

router.get("/v1/department",department.getList);
router.get("/v1/department/getSelectData",department.getSelectData);

import * as dictionary from "./dictionary";

router.get("/v1/dictionary/:type",dictionary.getList);
router.get("/v1/dictionary",dictionary.getAll);



import * as role from "./role";

router.get("/v1/role/findByPage",role.getList);

import * as userGroup from "./userGroup";

router.get("/v1/userGroup/findByPage",userGroup.getList);



export default router;