#1 全局npm 配置
npm i typescript gulp pm2 webpack -g

#1
/api/qbii/v1/xxx



#1获取前端 传递参数方式


 1. post     x-wwww-from-urlencoded   let searchParam  = ctx.request.body;
 2. get                               let searchParam = ctx.request.query;
 3. post     application/json         let searchParam = ctx.request.body;


  ctx.request.fields;
 4. /xx/xx/:xx                              let searchParam =  ctx.params

 #1 获取用户id

 ctx.userId

 #1  统一返回值

{
    code:Number,
    message:String,
    result:Object
}

#1 错误列表
200:"未登录",
404:"未发现",
405:"不允许使用该方法",
500:"内部错误",
1000:"超时",
0:"成功" //非0都失败

#2  路由配置文件
app/config/env/developments.ts

#2路由命名规则 遵循Restful规范  请求突破传统的get ,post,pul,delete
/模块名/xxxx/操作
操作{info:"详情","list":"列表"...}

比如  
/user/xxxxxx/info   查用户详情
/user  查用户列表






{
    "error": {
        "200": "未登录",
        "404": "未发现",
        "500": "内部错误",
        "1000": "超时",
        "405": "不允许使用该方法"
    },
    "routes": {
        "qbii": {
            "domain": "http://192.168.131.145:10550",
            "prefix": "/api/qbii",
            "timeout": 5000,
            "routes": {
                "/user/userId": {
                    "url": "/api/user/${userId}/userId",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/user/level": {
                    "url": "/api/user/${userId}/level",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/user/userInfo": {
                    "url": "/api/user/${userId}/userInfo",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/news/getNewsList": {
                    "url": "/api/news/getNewsList.html",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/news/getNewsDetail/": {
                    "url": "/api/news/getNewsDetail",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/user/userOrderList": {
                    "url": "/api/user/${userId}/userOrderList.html",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/user/userProfitList": {
                    "url": "/api/user/${userId}/userProfitList.html",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/project/list": {
                    "url": "/api/project/${userId}/list",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                },
                "/page/:projectId": {
                    "url": "/api/page/${userId}/${projectId}",
                    "version": "v1",
                    "versions": ["v1", "v2", "v3"]
                }
                // "/project/:projectId":{"url":"/api/project/${projectId}",version:"v1",versions:["v1","v2","v3"]}
            }
        },
        "good": {
            "domain": "http://192.168.7.104",
            "prefix": "/api/good",
            "timeout": 5000
        },
        "sys": {
            "domain": "http://192.168.131.145:10550", //http://mqbii.qbao.com  http://127.0.0.1:3001
            "prefix": "/api",
            "timeout": 5000
        }
    },
    "ignoreUrls": {
        "/api/account4Client/login": true
    },
    "redis": {
        "tokenKey": "nodeServer-token",
        "expiration": 2592000 //redis token保存时间
    },
    "cookie": {
        "signed": true,
        "maxAge": 2592000, // cookie有效时长
        "secure": false, //cookie是否只有https请求下才发送。
        "httpOnly": true //是否只有服务器可以取到cookie，默认为true。
        //"overwrite": false  // 是否允许重写
    },
    "SSO": false // 是否只允许一台机器登录
}