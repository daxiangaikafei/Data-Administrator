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

//const result:Result = new Result();


export const all  = function(ctx,next){
	let result:Result = new Result();
	let {method,header} =  ctx.request;
	let url = ctx._matchedRoute;
	let {userId} = ctx;
    let param= (method==="GET"?(ctx.request.query):(ctx.request.body || ctx.request.fields))||{};
	let params = ctx.params||{};
    url = url.replace(config.prefix,"");
   
	let urlFetch = config.routes[url]["url"];
    var compiled = template(urlFetch);
    urlFetch = compiled(Object.assign({},{userId},param,params));
	// console.log("urlFetch:"+urlFetch)
	console.log("url:"+urlFetch)
	console.dir(param)
	if(urlFetch){
		return fetch.getData(urlFetch,param,method).then((data:any)=>{
			if(data&&data.returnCode===0){
				result.success(data.data);
				ctx.body=result.getValue();
			}else if(!data){
				result.error(500);
				ctx.body=result.getValue();
			}else{
				result.error(data.returnCode,data.message);
				ctx.body=result.getValue();
			}
			
		}).catch((error)=>{
			console.log(error)
		})
	}else{
		result.error(404);
		ctx.body=result.getValue();
	}
    
	
}

