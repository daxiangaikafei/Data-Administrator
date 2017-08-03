import Result from "./../../../library/help/result";
import DB from "./../../model/index"
import RedisData from "./../../../library/help/redisData";


const db = new DB("api/api");

//获取所有列表
const getList = function (ctx, next) {
    let result = new Result();

    var populate = function(param,sort,currentPage,pageSize){
        return db.find(param).populate({
            path:"productId"
        }).sort(sort).skip((currentPage) * pageSize).limit(pageSize)
    }

    return db.findByPage(ctx.query, {}, populate).then((data) => {
        console.log(data)
        ctx.body = result.success(data)
    })
}

export default  {
    getList
}