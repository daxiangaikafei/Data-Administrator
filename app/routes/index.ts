import * as Router from "koa-router";
// let routers_qbii:Router = require("./../modular/qbii/index");
// let routers_good:Router = require("./../modular/good/index");
// let routers_sys :Router = require("./../modular/sys/index");
let email: Router = require("./../modular/email/index");


let routers_syss :Router = require("./../sys/api/auth/index");

let routes:Router[]= [
	// routers_qbii,
	// routers_good,
	// routers_sys,
	routers_syss,
	email
];
//module.exports = router
module.exports = routes;