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
const config = LocalConfig.routes.sys;
const router:Router = new Router();
router.prefix(config.prefix);

import {login} from "./login";

router.all("/account4Client/login",login);


import {isFinishNews} from "./qbiiExc";
//特意为qbii客户端修改的
router.post("/news/isFinishNews.html",isFinishNews)



module.exports = router