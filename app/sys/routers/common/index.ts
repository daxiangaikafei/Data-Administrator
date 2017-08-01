import * as  Router from "koa-router";

import commonRoutes from "./../../biz/common/index";
//console.log(commonRoutes)


import apis from "./config";
// const apis =

const router: Router = new Router();
router.prefix("/api/sys");

let baseUrl = "/db/";   
for (let key in apis) {
    let url = baseUrl + apis[key]["prefix"];
    let path = apis[key].path;
    //console.log("path",path)
    apis[key].add && router.post(url + "", (ctx, next) => { return commonRoutes.save(ctx, next, apis[key]) });
    apis[key].remove && router.delete(url + "/:id", (ctx, next) => { return commonRoutes.remove(ctx, next, path) });
    apis[key].up && router.put(url + "/:id", (ctx, next) => { return commonRoutes.up(ctx, next, path) });
    apis[key].find && router.get(url + "/all", (ctx, next) => { return commonRoutes.find(ctx, next, apis[key]) });
    apis[key].findByPage && router.get(url + "", (ctx, next) => { return commonRoutes.findByPage(ctx, next, apis[key]) });
    console.log("url:",url,apis[key].findByPage)//findByPage
    router.get(url + "/info/:id", (ctx, next) => { return commonRoutes.findById(ctx, next, apis[key]) });
}





export default router;