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




import * as department from "./../../biz/auth/departmentBiz";

router.get("/v1/auth/department", department.getList);
router.get("/v1/auth/department/getSelectData", department.getSelectData);

import * as dictionary from "./../../biz/auth/dictionaryBiz";

router.get("/v1/auth/dictionary/:type", dictionary.getList);
router.get("/v1/auth/dictionary", dictionary.getAll);


import * as role from "./../../biz/auth/roleBiz";

router.get("/v1/auth/role", role.getList);

import * as userGroup from "./../../biz/auth/userGroupBiz";

router.get("/v1/auth/userGroup", userGroup.getList);

module.exports = router;