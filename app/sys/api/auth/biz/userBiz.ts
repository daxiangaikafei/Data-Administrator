import Token from "./../../../../library/help/token";
import VerifyUser from "./../../../../library/verifyUser";
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

const db = new DB("/auth/user");
const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();
//判断用户名密码是否 正确
const login = function(ctx, next) {
        let result = new Result();
        let newUserInfo = ctx.request.body;
        if (newUserInfo.username && newUserInfo.password) {
            return db.find(newUserInfo).then((data:any) => {
                if (data.length === 1) {

                    //ctx.session.maxAge = config.serverSessionConfig.maxAge;
                    let userInfo = data[0];
                    // ctx.session.userkey = userInfo.nickname;
                    // ctx.cookies.set("nickname", encodeURI(userInfo.nickname));

                    let userId = userInfo._id;
                    let token = tokenHelp.build(data.data.userId);
                    verifyUser.saveData(token,userId);
                    verifyUser.setCookie(ctx,"token",token,userId);


                    ctx.body = result.success({
                        userName: userInfo.userName,
                        userNameCn: userInfo.nickname,
                        userIcon: ""
                    });
                } else {
                    ctx.body = result.error(1,"用户名或者密码错误！");
                }
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            });
        } else {
            ctx.body = result.error(1,"用户名或者密码不能为空");
        }

    }
    //判断是否登录
const isLogin = function(ctx, next) {
    let result = new Result();
    if (ctx.session.userkey) {
        ctx.body = result.success();
        return;
    };
    ctx.body = result.error(1);
}

//注销
const loginOff = function(ctx, next) {
    let result = new Result();
    ctx.session.userkey = undefined;
    ctx.body = result.success();
}

const registered = function(ctx, next) {
    let result = new Result();
    let saveData = ctx.request.body;
    saveData.createBy =  "--------";
    saveData.upBy = "00000000";
    return db.save(saveData).then((data) => {
        ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,JSON.stringify(error.errors));
    })
}
export default  {
    login,
    isLogin,
    loginOff,
    registered
}