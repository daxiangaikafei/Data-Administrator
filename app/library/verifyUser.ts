
interface Config  {
    error:any;
    routes:any;
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
}

import redis from "./help/redis";
import Token from "./help/token";
import Result from "./help/result"; 
import * as moment from "moment";

const result:Result = new Result();
const config:Config = require("./../config/index");

const IgnoreUrls = config.ignoreUrls;
const format = "YYYY-MM-DD hh:mm:ss:SSS";
const tokenHelp:Token = new Token();

const env     = process.env.NODE_ENV || 'development';

const SSO = config.SSO;
class VerifyUser {
    constructor(){
        this.verify= this.verify.bind(this);
    }
    setCookie(ctx,key,token,userId){
        ctx.cookies.set(key,(SSO===true?(token+userId):token),config.cookie)//LocalConfig.cookie  {"signed":true}  config.cookie
    }
    getCookie(ctx){
        	
    }
    //存入 redis token userId now
    saveData(token:string,userId:string,saveObj){
                let data = {
                    token,
                    userId,
                    ...saveObj,
                    date:moment().format(format)
                }
                //console.log("保存token",JSON.stringify(data));
                let key = config.redis.tokenKey+":"+(SSO===true?userId:token);
                redis.set(key,JSON.stringify(data));
                redis.expire(key,config.redis.expiration);
                //redis.set(config.redis.tokenKey+":"+userId,JSON.stringify(data));
    }
    getData(key:string){
        //console.log("查询"+config.redis.tokenKey+":"+key)
        return redis.get(config.redis.tokenKey+":"+key);
    }
    getUserInfo(ctx){
        return this.getData(this.getToken(ctx)).then((result)=>{
            return JSON.parse(result);
        })
    }
    //判断是否有大登录的ST  是够有token  和token是否失效
    verifyToken(token:string){
        return new Promise((rev,reb)=>{
                if(!token){
                    reb();
                }
                this.getData(token).then(result=>{
                        if(result){
                            rev(JSON.parse(result))
                        }else{
                            reb()
                        }
                        //return JSON.parse(result);
                })
        })


        // if(!token){
        //     return new Promise((rev,reb)=>{
        //         reb();
        //     })
        // }
        //let params = token.split(",");
        // return this.getData(params[1]).then(result=>{
        //         return JSON.parse(result);
        // })
        // return this.getData(token).then(result=>{
                
        //         return JSON.parse(result);
        // })
    }
    next(next:any){
        return next.then(()=>{

        })
    }
    getToken(ctx){
        let token = ctx.cookies.get("token");

        if(!token&&process.env.NODE_ENV==="development"){
            return ctx.request.headers.token||undefined;
        }
        return token;
    }
    verify(ctx,next){
        //查看url是否在 过滤名单里面  .split(",")[1]
        //let token = ctx.cookies.get("token");
        let token  = this.getToken(ctx);
        let {url} = ctx;

        ////console.log("url:"+ctx.request);
        url = url.split("?")[0];
        // return next();
        if(IgnoreUrls[url]){
            return next();
        }

        if(token){
            ////console.log("token",token);
            
            return this.verifyToken(token).then((info:any)=>{
                ////console.log("info"+":"+info);
                // ctx.state.userInfo.userId  = info.userId;
                // ctx.userInfo = info;
                ctx.state.userInfo = info;
                return next();
            }).catch(()=>{
                result.error(200,"登录过期");
                ctx.body = result.getValue();
                return; 
            })
        }else{
            result.error(200,"未登陆");
            ctx.body = result.getValue();
            return;
        }
        
    }
    
}

export default VerifyUser;