import * as Router from "koa-router";


const router: Router = new Router();
router.prefix("/api/sys");

import api from './api'

router.get("/v1/api/api", api.getList);
router.get("/v1/api/gateway/push", api.pushRedis)

export default router;