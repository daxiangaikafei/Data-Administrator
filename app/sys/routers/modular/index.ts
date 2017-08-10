import * as  Router from "koa-router";
const router: Router = new Router();
router.prefix("/api/sys");


import * as redis from "./redis";
router.get("/v1/modular/redis/:key",redis.getData);
router.put("/v1/modular/redis/:key",redis.upData);
router.post("/v1/modular/redis/:key",redis.saveData);

import * as gateway from './gateway';
router.get("/v1/modular/gateway/push", gateway.pushRedis);

export default router;