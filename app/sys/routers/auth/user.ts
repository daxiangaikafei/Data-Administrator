
import Result from "./../../../library/help/result";
import VerifyUser from "./../../../library/verifyUser";
import Token from "./../../../library/help/token";
import PassWord from "./../../../library/help/password";
import {each} from "lodash";

import Biz from "./../../biz/auth/userBiz";

const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();
const passWord:PassWord = new PassWord();

//判断用户名密码是否 正确
const login = async function (ctx, next) {
    let result = new Result(),
        newUserInfo = ctx.request.body;
    if (newUserInfo.username && newUserInfo.password) {
        // newUserInfo.password = passWord.encrypt(newUserInfo.password,false);
        let userInfo:any  = await Biz.getUserInfo(newUserInfo);
        if (userInfo) {
            let userId = userInfo._id.toString()
            let token = tokenHelp.build(userId);
            verifyUser.saveData(token,userId,{
                realName:userInfo.realName,
                username:userInfo.username
            });
            verifyUser.setCookie(ctx,"token",token,userId);
            ctx.state = userInfo;
            ctx.body = result.success({
                officeName:userInfo.officeName,
                branchName:userInfo.branchName,
                departmentName:userInfo.departmentName,
                roleName:userInfo.roleName,
                realName:userInfo.realName,
                username:userInfo.username,
                userGroups:userInfo.userGroups,
                departments:userInfo.departments
            });
        } else {
            ctx.body = result.error(1,"用户名或者密码错误！");
        }
    } else {
        ctx.body = result.error(1, "用户名或者密码不能为空");
    }
}

//注销
const loginOff = function(ctx, next) {
    let result = new Result();
    verifyUser.setCookie(ctx,"token",undefined,undefined);
    ctx.body = result.success();
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

//获取用户详情
const getUserInfo = async function (ctx, next) {
    let result = new Result();

    let userInfo : any = await Biz.getUserInfo({_id:ctx.state.userInfo.userId});
    if (userInfo) {
        ctx.body = result.success({
            officeName: userInfo.officeName,
            branchName: userInfo.branchName,
            departmentName: userInfo.departmentName,
            roleName: userInfo.roleName,
            realName: userInfo.realName,
            username: userInfo.username,
            userGroups: userInfo.userGroups,
            departments: userInfo.departments
        });
        return;
    }
    ctx.body = result.error(1, "呵呵")
}

const registered = function(ctx, next) {
    let result = new Result();
    let saveData = ctx.request.body;
    saveData.createBy =  ctx.state.userInfo.userId;
    saveData.upBy = ctx.state.userInfo.userId;
    
    return Biz.save(saveData); 
}

const upUser = async function (ctx, next) {
    let result = new Result();
    let saveData = ctx.request.body;
    saveData.upBy = ctx.state.userInfo.userId;
    await Biz.up(ctx.params.id,saveData);
    ctx.body = result.success();
} 

//查询所有用户
const getUsers = async function(ctx,next){
    let result = new Result();

    let userInfo : any = await Biz.getAll(ctx.query);
    if (userInfo) {
        ctx.body = result.success(userInfo);
        return;
    }
    ctx.body = result.error(1, "呵呵")
}
const getUsersByPage = async function(ctx,next){
    let result = new Result();

    let userInfo : any = await Biz.getUsersByPage(ctx.query);
    if (userInfo) {
        ctx.body = result.success(userInfo);
        return;
    }
    ctx.body = result.error(1, "呵呵")
}


export default  {
    login,
    isLogin,
    loginOff,
    getUserInfo,
    upUser,
    registered,
    getUsers,
    getUsersByPage
}