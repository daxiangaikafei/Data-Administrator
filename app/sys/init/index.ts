import DB from "../model/index";
import * as path from "path";
const fs = require('fs');


import UserBiz from "./../biz/auth/userBiz";
 
export default class DataBaseInit {
    async init(){
        let isInit = await this.hasData();
        console.log(isInit)
        if(isInit == 10){
            this.initData()
        }
    }

    private async hasData(){
        let db = new DB("auth/user");
        return await db.find().then(data=>{
            console.log(data)
            return data.length
        })
    }

    private async initData(){
        let config = await this.readConfig();
        for(var key in config){
            this.insertDB(key, config[key])
        }
    }

    private async readConfig(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,'./insertConfig.json')).toString());
    }

    private async insertDB(dbName, list){
        //添加个最大权限的用户 
        if(dbName == "auth/user"){
            list.map(obj=>UserBiz.save(obj));
        }else{
            let db = new DB("auth/user");
            list.map(obj=>db.save(obj));
        }
    }
}