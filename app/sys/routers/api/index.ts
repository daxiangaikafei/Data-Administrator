import * as Router from "koa-router";


const router: Router = new Router();
router.prefix("/api/sys");

import apiBiz from './../../biz/api/apiBiz'

router.get("/v1/api/api", apiBiz.getList);

export default router;