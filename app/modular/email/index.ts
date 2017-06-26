interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

import * as Router from "koa-router";
import {sendWarn} from './warn';

const config:Config = require("./../../config/index");
const curConf = config.routes.email;
const router:Router = new Router();
router.prefix(curConf.prefix)

router.get("/warn", sendWarn);
module.exports = router;

