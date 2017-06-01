import Token from "./../../../../library/help/token";
import VerifyUser from "./../../../../library/verifyUser";
import Result from "./../../../../library/help/result";
import DB from "./../../../model/index";

import {each} from "lodash";

import PassWord from "./../../../../library/help/password";

const db = new DB("auth/user");
const tokenHelp:Token = new Token();
const verifyUser:VerifyUser = new VerifyUser();
const passWord:PassWord = new PassWord();
//判断用户名密码是否 正确
const login = function(ctx, next) {
        let result = new Result();
        let newUserInfo = ctx.request.body;

       
        if (newUserInfo.username && newUserInfo.password) {
            newUserInfo.password = passWord.encrypt(newUserInfo.password);
            return db.find(newUserInfo).populate({
                path:"userGroups",
                select:"name",
                match: { isDel:0}
            }).populate({
                path:"departments",
                select:["name","branchId"],
                match: { isDel:0},
                populate:{
                    path:"branchId",
                    select:"name",
                    match: { isDel:0}
                }
            }).then((data:any) => {
                if (data.length === 1) {

                    //ctx.session.maxAge = config.serverSessionConfig.maxAge;
                    let userInfo = data[0]._doc;
                    // ctx.session.userkey = userInfo.nickname;
                    // ctx.cookies.set("nickname", encodeURI(userInfo.nickname));

                    let userId = userInfo._id.toString()
                    let token = tokenHelp.build(userId);
                    verifyUser.saveData(token,userId,{
                        realName:userInfo.realName,
                        username:userInfo.username
                    });
                    verifyUser.setCookie(ctx,"token",token,userId);
                    
                    console.log(JSON.stringify(userInfo))
                    ctx.body = userInfo;
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
    // ctx.session.userkey = undefined;
    verifyUser.setCookie(ctx,"token",undefined,undefined);
    ctx.body = result.error(200,"未登录");
}

const registered = function(ctx, next) {
    let result = new Result();
    let saveData = ctx.request.body;
    saveData.createBy =  ctx.userId;
    saveData.upBy = ctx.userId;
    if(saveData.username && saveData.password){
        if(!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.exec(saveData.password)){
            ctx.body = result.error(1,"密码只能输入6-20个以字母开头的字符串")
            return false;
        }
        saveData.password = passWord.encrypt(saveData.password)
    }else{
        ctx.body = result.error(1,"username或者password不能为空")
        return false;
    }
    return db.find({username:saveData.username}).then((data:any) => {
        if (data.length === 0) {
            return db.save(saveData).then((data) => {
                ctx.body = result.success();
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            })
        } else {
            ctx.body = result.error(1,"无法重复创建"+saveData.username);
        }
        //ctx.body = result.success();
    }).catch((error) => {
        ctx.body = result.error(1,error.message);
    })

    // return db.save(saveData).then((data) => {
    //     ctx.body = result.success();
    // }).catch((error) => {
    //     ctx.body = result.error(1,JSON.stringify(error.errors));
    // })
}

const getUserInfo = function(ctx,next){
    let result = new Result();
        
            //newUserInfo.password = passWord.encrypt(newUserInfo.password);
            return db.find({_id:"592e1eeec34325edfb70cc7e", isDel:0}).populate({
                path:"userGroups",
                select:"name",
                match: { isDel:0}
            }).populate({
                path:"departments",
                select:["name","branchId"],
                match: { isDel:0},
                populate:{
                    path:"branchId",
                    select:"name",
                    match: { isDel:0},
                    populate:{
                        path:"",
                        selct:"name",
                        match: { isDel:0}
                    }
                }
            }).then((data:any) => {
                if (data) {
                    let userInfo = data._doc;
                    ctx.body = userInfo;
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
                    ctx.body = result.error(1,"username没有查询到");
                }
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            });
       
}

//查询所有用户
const getUsers = function(ctx,next){
    let result = new Result();

    
    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
                path:"userGroups",
                select:"name",
                match: { isDel:0}
            }).populate({
                path:"departments",
                select:["name","branchId"],
                match: { isDel:0},
                populate:{
                    path:"branchId",
                    select:"name",
                    match: { isDel:0},
                    populate:{
                        path:"",
                        selct:"name",
                        match: { isDel:0}
                    }
                }
            }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }
    return db.findByPage(ctx.query,{},{},populate).then((data:any) => {
                each(data.result,function(user,index){
                    let newBranchs = [];
                    each(user._doc.departments,function(department,index){
                        newBranchs.push(department.branchId);
                        delete department.branchId;
                        return department
                    })
                    user._doc.branchId = newBranchs;

                })
                ctx.body = result.success(data);
            }).catch((error) => {
                ctx.body = result.error(1,error.message);
            });
}

const upUser = function (ctx, next) {
    let result = new Result();
    let saveData = ctx.request.body;
    saveData.upBy = ctx.userId;
    if (saveData.password&&saveData.password!=="") {
        if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.exec(saveData.password)) {
            ctx.body = result.error(1, "密码只能输入6-20个以字母开头的字符串")
            return false;
        }
        saveData.password = passWord.encrypt(saveData.password)
    }
    if(saveData.password===""){
        delete saveData.password;
    }

    return db
        .update(saveData._id, saveData)
        .then((data) => {
            ctx.body = result.success();
        })
        .catch((error) => {
            ctx.body = result.error(1, error.message);
        })

}
export default  {
    login,
    isLogin,
    loginOff,
    registered,
    getUserInfo,
    getUsers,
    upUser
}