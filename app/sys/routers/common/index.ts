import * as  Router from "koa-router";
import save from "./save";
import {find,findById} from "./find";
import remove from "./remove";
import up from "./up";
import sort from "./sort";
import findByPage from "./findByPage";

import apis from "./config";

const router: Router = new Router();
router.prefix("/api/sys");

let baseUrl = "/db/";   
for (let key in apis) {
    let url = baseUrl + apis[key]["prefix"];
    let path = apis[key].path;
    //console.log("path",path)
    apis[key].add && router.post(url + "", (ctx, next) => { return save(ctx, next, apis[key]) });
    apis[key].remove && router.delete(url + "/:id", (ctx, next) => { return remove(ctx, next, path) });
    apis[key].up && router.put(url + "/:id", (ctx, next) => { return up(ctx, next, path) });
    apis[key].find && router.get(url + "/all", (ctx, next) => { return find(ctx, next, apis[key]) });
    apis[key].findByPage && router.get(url + "", (ctx, next) => { return findByPage(ctx, next, apis[key]) });
    console.log("url:",url,apis[key].findByPage)//findByPage
    router.get(url + "/info/:id", (ctx, next) => { return findById(ctx, next, apis[key]) });
}





export default router;