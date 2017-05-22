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
const verifyUser:VerifyUser = new VerifyUser();

const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.sys;

const SSO = LocalConfig.SSO;


const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);



export const login = function(ctx,next){
	let result:Result = new Result();
	let token = verifyUser.getToken(ctx);
	return verifyUser.verifyToken(token).then((info)=>{
		if(SSO===true){
			ctx.body={
				"responseCode": 1000
			}
		}else{
			return smallLogin(ctx,next);
		}
		
	}).catch(()=>{
		return smallLogin(ctx,next);
	})


	
};

const smallLogin = function(ctx,next){
	 let searchParam  = ctx.request.body;
	 console.log("?",searchParam);
	 let result:Result = new Result();
	 if(!searchParam.st){
		 result.error(404);
		 ctx.body=result.getValue();
		 /**
		  *   "data": null,
  "errorCode": 0,
  "errorMsg": "网络错误",
  "responseCode": 1005
		  */
		 return;
	 }
	 

	return fetch.getData("/api/account4Client/login",searchParam,"POST",{},"form-data").then((data:any)=>{

		if(data.responseCode===1000){
			let userId = data.data.userId;
			let token = tokenHelp.build(data.data.userId);
			verifyUser.saveData(token,userId);
			verifyUser.setCookie(ctx,"token",token,userId);
			ctx.body=data;
		}else{
			ctx.body=data
		}
		//result.success({});
		
	})
}

