import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys");


import * as redis from "./../../biz/modular/redis";
 

router.get("/redis/:key",redis.getData);
router.put("/redis/:key",redis.upData);


module.exports = router;