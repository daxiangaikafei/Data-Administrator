import * as Router from "koa-router";


const router: Router = new Router();
router.prefix("/api/sys");

import api from './api'

router.get("/v1/api/api", api.getList);

export default router;