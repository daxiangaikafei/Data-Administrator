import Result from "./../../../library/help/result";
import Biz from "./../../biz/common"

import {isArray,each,isEmpty} from "lodash";

//新增
const save = async function (ctx, next, config) {
    // let db = new DB(config.path);
    let result = new Result();
    let saveData : any = ctx.request.body;
    saveData.createBy = ctx.state.userInfo.userId;
    saveData.upBy = ctx.state.userInfo.userId;

    let hasProps = true;
    let arrr = config.add === true
        ? []
        : config.add.key;
    arrr = isArray(arrr)
        ? arrr
        : (arrr).split(",");
    let newO : any = {};

    each(arrr, function (value, index) {
        if (isEmpty(saveData[value])) {
            hasProps = false;
            return;
        }
        newO[value] = saveData[value];
    })
    // newO.isDel =0 ;

    if (hasProps) {
        let data = await Biz.find(newO, config);
        if (data.length === 0) {
            ctx.body = result.success();
            return
        } else {
            ctx.body = result.error(1, "无法重复创建");
            return
        }
    }
    ctx.body = result.error(1, "缺少参数" + config.name);
    return

}



export default save