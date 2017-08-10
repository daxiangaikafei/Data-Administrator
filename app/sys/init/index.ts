



import UserBiz from "./../biz/auth/userBiz";
//添加个最大权限的用户  

const addAdminUser = ()=>{
    let userInfo={
        username:"admin1",
        password:"admin1"
    }

   let info = UserBiz.save(userInfo);


}