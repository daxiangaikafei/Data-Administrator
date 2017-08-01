import * as Router from "koa-router";
// let routers_qbii:Router = require("./../modular/qbii/index");
// let routers_good:Router = require("./../modular/good/index");
// let routers_sys :Router = require("./../modular/sys/index");


// let routers_syss :Router = require("./../sys/api/auth/index");

import sysRoutes from "./../sys/routers"

let routes:Router[]= sysRoutes;

export default routes;