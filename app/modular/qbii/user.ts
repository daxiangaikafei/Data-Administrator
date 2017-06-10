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
import {template} from "lodash";


const LocalConfig:Config = require("./../../config/index");
const config = LocalConfig.routes.qbii;

const fetch:Fetch = new Fetch(config.domain,config.timeout);
fetch.setDomain(config.domain);
fetch.setTimeout(config.timeout);



export const login = function(ctx,next){
	////console.log("userId:",ctx.state.userInfo.userId);
	let result:Result = new Result();
	let {userId} = ctx;
	return fetch.getData("/api/user/"+userId+"/userId",{},"GET").then((data:any)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

export const news = function(ctx,next){
	let result:Result = new Result();
	//console.log("userId:",ctx.state.userInfo.userId);
	return fetch.getData("/api/news/getNewsList.html",{},"GET").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};

export const isFinishNews = function(ctx,next){
	let result:Result = new Result();
	//console.log("userId:",ctx.state.userInfo.userId);
	return fetch.getData("/api/news/isFinishNews.html",{},"POST").then((data)=>{
		result.success(data);
		ctx.body=result.getValue();
	})
};
