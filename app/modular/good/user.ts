interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

import Result from "./../../library/help/result";
import Fetch from "./../../library/help/fetch";

import Token from "./../../library/help/token";
import VerifyUser from "./../../library/verifyUser";

const moment = require("moment");

const tokenHelp:Token = new Token();
const verifyUser:VerifyUser =
  new VerifyUser();

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.good;

const SSO = LocalConfig.SSO;


const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);

export const login = function(ctx,next){
	let result:Result = new Result();
	//console.log("userId:",ctx.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

