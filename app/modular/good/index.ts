interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

import * as Router from "koa-router";
import Fetch from "./../../library/help/fetch";

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.good;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./user";

router.all("/user/userId",login)



module.exports = router