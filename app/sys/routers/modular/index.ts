import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys/modular");


import * as redis from "./../../biz/modular/redis";
 

router.get("/v1/redis/:key",redis.getData);
router.put("/v1/redis/:key",redis.upData);
router.post("/v1/redis/:key",redis.saveData);


export default router;