import DB from "../model/index";
import * as path from "path";
const fs = require('fs');


import UserBiz from "./../biz/auth/userBiz";
 
export default class DataBaseInit {

    private DBList = [];
    private DataList = [];
    private DBResult = {};

    async init(){
        // await this.removeAllData();

        let isInit = await this.hasData();
        if(isInit === 0){
           await this.initData();
           console.log("数据初始化完成")
        }
    }

    private async removeAllData(){
        let db;
        db = new DB("auth/user");
        await db.getModel().remove({});
        db = new DB("auth/branch");
        await db.getModel().remove({});
        db = new DB("auth/department");
        await db.getModel().remove({});
        db = new DB("auth/product");
        await db.getModel().remove({});
        db = new DB("auth/dictionary");
        await db.getModel().remove({});
        db = new DB("permission/permissions");
        await db.getModel().remove({});
        db = new DB("permission/menu");
        await db.getModel().remove({});
        db = new DB("auth/role");
        await db.getModel().remove({});
        db = new DB("auth/userGroup");
        await db.getModel().remove({});
    }

    private async hasData(){
        let db = new DB("auth/user");
        return await db.find().then(data=>{
            return data.length
        })
    }

    private async initData(){
        let config = await this.readConfig();
        for(var key in config){
            this.DBList.push({db: key, data: config[key]})
        }

        this.insertDB();
    }

    private async readConfig(){
        return JSON.parse(fs.readFileSync(path.resolve(__dirname,'./insertConfig.json')).toString());
    }

    private async insertDB(){
        if(this.DBList.length === 0){
            return;
        }
        let obj = this.DBList.shift();
        let data = obj.data;
        let dbname = obj.db;
        this.DBResult[dbname] = {}
        for(let key in data){
            this.DataList.push({key:key, data: data[key]});
        }
        await this.insertData(dbname)
        if(this.DBList.length > 0){
            return await this.insertDB();
        }
    }

    private async insertData(dbname){
        if(this.DataList.length === 0){
            return
        }

        let obj = this.DataList.shift();
        // console.log(dbname, obj.key, this.DataList.length);
        let key = obj.key, data = obj.data, result;
        //添加个最大权限的用户
        for(var k in data){
            if(Array.isArray(data[k])){
                data[k] = data[k].map(o => this.formatStringId(o));
            }else{
                data[k] = this.formatStringId(data[k]);
            }
        }
        // console.log("save data:", data)
        if(dbname == "auth/user") {
            result = await UserBiz.save(data)
        } else {
            let db = new DB(dbname);
            result = await db.save(data)
        }
        
        this.DBResult[dbname][key] = result;
        // console.log("DBResult:", this.DBResult)

        if(this.DataList.length > 0) {
            return await this.insertData(dbname)
        }
    }

    private formatStringId(str){
        let temp = str.split(".");
        if(temp.length === 3){
            if(this.DBResult[temp[0]] && this.DBResult[temp[0]][temp[1]] && this.DBResult[temp[0]][temp[1]][temp[2]]){
                str = this.DBResult[temp[0]][temp[1]][temp[2]];
            }
            // console.log("获取替换ID:", str)
        }
        return str;
    }
}