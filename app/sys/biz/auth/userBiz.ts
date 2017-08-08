import Token from "./../../../library/help/token";
import VerifyUser from "./../../../library/verifyUser";
import DB from "./../../model/index";
import Error from "./../../../library/help/error";

import {each} from "lodash";

import PassWord from "./../../../library/help/password";

const db = new DB("auth/user");
const passWord : PassWord = new PassWord();

const error = new Error("userBiz");

//获取用户详情
const getUserInfo = async function (userInfo : any) {
    Object.assign(userInfo, {isDel: 0})
    if (userInfo.password) {
        userInfo.password = passWord.encrypt(userInfo.password);
    }
    let result = await db.getModel().findOne(userInfo).populate({
            path: "userGroups",
            select: "name",
            match: {
                isDel: 0
            }
        })
        .populate({
            path: "departments",
            select: [
                "name", "branchId"
            ],
            match: {
                isDel: 0
            },
            populate: {
                path: "branchId",
                select: "name",
                match: {
                    isDel: 0
                }
            }
        })
        .then((data) => {
            return data
                ? data._doc
                : undefined
        })
        .catch((err) => {
            throw error.set(1, err.message);
        })
        
        return result;
}

const up = async function (id,userInfo) {
    // let result = new Result();

    if (userInfo.password && userInfo.password !== "") {
        if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.exec(userInfo.password)) {
            // return  result.error(1, "密码只能输入6-20个以字母开头的字符串");
            throw error.set(1, "密码只能输入6-20个以字母开头的字符串");
        }
        userInfo.password = passWord.encrypt(userInfo.password)
    }
    if (userInfo.password === "") {
        delete userInfo.password;
    }
    if (!id) {
        throw error.set(1, "用户id不能为空");
    }
    return await db.getModel().findOne({_id:id}).then((doc)=>{
        doc.set(userInfo);
        doc.save();
        return true
    }).catch((err) => {
        throw error.set(1, err.message);
    })

 

}

const save = async function (saveData : any) {

    if (saveData.username && saveData.password) {
        if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.exec(saveData.password)) {
            throw error.set(1, "密码只能输入6-20个以字母开头的字符串");
        }
        saveData.password = passWord.encrypt(saveData.password)
    } else {
        throw error.set(1, "username或者password不能为空");
    }
    return await db
        .find({username: saveData.username})
        .then((data : any) => {
            if (data.length === 0) {
                return db
                    .save(saveData)
                    .then((data) => {
                        // ctx.body = result.success();
                        return true;
                    })
                    .catch((err) => {
                        throw error.set(1, err.message);
                        // ctx.body = result.error(1,error.message);
                    })
            } else {
                throw error.set(1, "无法重复创建" + saveData.username);
                // ctx.body = result.error(1,"无法重复创建"+saveData.username);
            }
            //ctx.body = result.success();
        })
        .catch((err) => {
            throw error.set(1, err.message);
            // ctx.body = result.error(1,error.message);
        })
}

export const getUsersByPage = async function (userInfo,pageInfo={pageSize:10000,currentPage:1}) {
    var populate = function (param, sort, currentPage, pageSize) {
        return db
            .find(param)
            .populate({
                path: "userGroups",
                select: "name",
                match: {
                    isDel: 0
                }
            })
            .populate({
                path: "departments",
                select: [
                    "name", "branchId"
                ],
                match: {
                    isDel: 0
                },
                populate: {
                    path: "branchId",
                    select: "name",
                    match: {
                        isDel: 0
                    },
                    populate: {
                        path: "",
                        selct: "name",
                        match: {
                            isDel: 0
                        }
                    }
                }
            })
            .sort(sort)
            .skip((currentPage) * pageSize)
            .limit(pageSize)
    }

    //  let {pageSize,currentPage} = pageInfo;
    //模糊查询
    if(userInfo.searchKey){
        let exp = new RegExp(userInfo.searchKey);
        userInfo["$or"] = [{"id":exp},{"username":exp}];
        //  userInfo["$or"] = [{"id":"admin1"},{"username":"admin1"}];
        delete userInfo.searchKey;
    }

    return await db.findByPage(userInfo, {}, pageInfo, populate).then((data : any) => {
        each(data.result, function (user, index) {
            let newBranchs = [];
            each(user._doc.departments, function (department, index) {
                newBranchs.push(department.branchId);
                delete department.branchId;
                return department
            })
            user._doc.branchId = newBranchs;

        })
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    });
}

const getAll = async function (userInfo) {

    return await db.find(userInfo).then((data : any) => {
        return data;
    }).catch((err) => {
        throw error.set(1, err.message);
    });
}

export default {
    up,
    save,
    getUserInfo,
    getAll,
    getUsersByPage
}