import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys");


// import user from "./../../auth/user"; /api/sys/v1/auth/auth/user
import user from "./user";



router.post("/v1/auth/user/login", user.login);

// router.post("/v2/user/login", user.login);

router.post("/v1/auth/user/registered", user.registered);
router.post("/v1/auth/user/isLogin", user.isLogin);
router.get("/v1/auth/user/info", user.getUserInfo);
router.get("/db/user", user.getUsersByPage);
router.get("/db/user/all", user.getUsers);
router.get("/v1/auth/user/loginOff", user.loginOff);
router.put("/db/user/:id", user.upUser);



import * as department from "./department";

router.get("/v1/auth/department",department.getList);
router.get("/v1/auth/department/getSelectData",department.getSelectData);

import * as dictionary from "./dictionary";

router.get("/v1/auth/dictionary/:type",dictionary.getList);
router.get("/v1/auth/dictionary",dictionary.getAll);



import * as role from "./role";

router.get("/v1/auth/role/findByPage",role.getList);

import * as userGroup from "./userGroup";

router.get("/v1/auth/userGroup/findByPage",userGroup.getList);



export default router;