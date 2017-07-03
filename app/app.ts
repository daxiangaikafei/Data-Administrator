import        *             as         path       from       'path';

import        {each}        from       "lodash";
import        *             as         koa        from       'koa';
// import        *             as         logger     from       'koa-logger';
import        *             as         Router     from       "koa-router";
import        *             as         body       from       "koa-bodyparser";

// import        CSRF          from       "koa-csrf";

import        Result        from       "./library/help/result";
import        VerifyUser    from       "./library/verifyUser";
import       RequestLogger     from    "./library/log/request";
import logger from "./library/log/logger"

// import RedisData from "./library/help/redisData";
// let xx = new RedisData("lll");
// let info  = xx.setProps("name.sss.xx",1223);



//import aa from "./library/help/mysql";
interface Sysconfig {
    server:any,
    localServer:any;
    redis:any;
    qiniu:any;
}
//aa;
//import * as onError    from 'koa-onerror'npm
//console.log(RequestLogger)
const env     = process.env.NODE_ENV || 'development';


let config    : Sysconfig  = require("./../config/index");

let routers   : Router[]   = require("./routes/index");
let result    : Result     = new Result();

let verifyUser: VerifyUser = new VerifyUser();

let app       : koa        = new koa();
app.keys      = ['im a newer secret', '你说是啥 就是啥，呵呵哒'];

// app.use(logger());//日志

const convert = require('koa-convert');


//request日志处理
app.use(RequestLogger());

app.use(convert(body({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
  // querystring: require('qs')
})));//表单什么数据转换 

// app.use(new CSRF({
//   invalidSessionSecretMessage: 'Invalid session secret',
//   invalidSessionSecretStatusCode: 403,
//   invalidTokenMessage: 'Invalid CSRF token',
//   invalidTokenStatusCode: 403,
//   excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
//   disableQuery: false
// })); //csrf公鸡

//异常日志处理
// errorLogger(app);
//异常处理
app.context.onerror = function(err) {

    if (err  ==  null) {
      return;
    }
    result.error(500,"");
    this.res.end(JSON.stringify(result.getValue()));
}

/*处理  404   500  页面 */
app.use((ctx,next)=>{
    return next().then(()=>{
        if(ctx.status!==200){
            result.error(ctx.status,"");
            ctx.body=result.getValue();
            logger.error("normal","",ctx.status);
        }else{
            //  return;
        }
    }).catch(error=>{
        // console.error(error)
        result.error(1000,"超时");
        ctx.body=result.getValue();
        logger.error("error","",error);
    });
})


app.on('error', err =>
  logger.error('server error', err)
);
//用户校验
app.use(verifyUser.verify);

each(routers,function(router,index){
  app.use(router.routes())
  app.use(router.allowedMethods());
})

app.listen(config.localServer.port);



