   import Result from "./../../../library/help/result";
import Biz from "./../../biz/common"


    //修改
const up = async function(ctx, next,name:string) {
    let upData = ctx.request.body;

    let result = new Result();
     let id = ctx.params.id;
    upData.upBy = ctx.state.userInfo.userId;
    ctx.body = result.success(await Biz.up(id,upData,name));

}


export default up