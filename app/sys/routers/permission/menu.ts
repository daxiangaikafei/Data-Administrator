import Result from "./../../../library/help/result";
import * as Biz from "./../../biz/permission/menuBiz";


//获取用户权限
export const getMenusByUser = async function(ctx, next) {
        let result = new Result();
        let userId = ctx.state.userInfo.userId;

        let data = await Biz.getMenusByUser({userId});
        ctx.body = result.success(data);
}

//获取所有菜单
export const getMenus = async function(ctx, next) {
        let result = new Result();
        let data = await Biz.getMenusByUser(ctx.query);
        ctx.body = result.success(data);

}




//获取所有菜单
export const getMenuPermissions = async function(ctx, next) {
        let result = new Result();
        let {id} = ctx.params;
        let data = await Biz.getMenuPermissions(id);
        ctx.body = result.success(data);
}
