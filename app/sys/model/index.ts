var mongoose = require('mongoose');
// import * as mongoose from "mongoose";
import * as moment from "moment";
import * as _ from "lodash";

const { monogodb } = require("./../../../config/index");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + monogodb.ip + ":" + monogodb.port + '/temp1',{"useMongoClient":true},function(error) {
    // body...
    if (error) {
        //console.log("连接数据库 出错", error);
    }
});

require ("./auth/dictionary");

class DB {
    private  Model
    constructor(path) {
        let model = require("./" + path);
        // console.error("path:",path)
        //let a:mongoose.model ;
        // this.Model = mongoose.model(model.dataBasename, model.Schema);
        this.Model = model
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.find = this.find.bind(this);
        this.getModel = this.getModel.bind(this);
    }
    save(data) {

        var entity = new this.Model(data);
        return new Promise(function(resolve, reject) {
            entity.save().then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        })

    }
    // update(id, updata) {
    //     let model = this.Model;
    //     updata.upTime = moment();
    //     return new Promise(function(resolve, reject) {
    //         model.findByIdAndUpdate({ _id: id }, { $set: updata }).then((data) => {
    //             resolve(data);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     });
    // }
    update(id, updata) {
        let model = this.Model;
        updata.upTime = moment();
        return model.findOne({_id:id}).then((doc)=>{
            doc.set(updata);
            doc.save();
        })
        // return new Promise(function(resolve, reject) {
        //     model.findByIdAndUpdate({ _id: id }, { $set: updata }).then((data) => {
        //         resolve(data);
        //     }).catch((error) => {
        //         reject(error);
        //     });
        // });
    }
    getModel(){
        
        return this.Model;
    }
    remove(id,param) {
        let model = this.Model;
        let updata:any = {};
        updata.upTime = moment();
        updata.isDel = 1;
        updata = Object.assign({},updata,param);

        return new Promise(function(resolve, reject) {
            model.findByIdAndUpdate({ _id: id }, { $set: updata }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    updateByParam(searchParam = {}, updata) {
        let model = this.Model;
        updata.upTime = moment();
        return new Promise(function(resolve, reject) {
            model.findByIdAndUpdate(searchParam, { $set: updata }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    findByPage(data ?:any, sort ?:any, page ?:any,populatePromise?:any) {
        data = Object.assign({},DATA_SEARCH_DEFAULT,data);
        sort = Object.assign({},{ "_id": "desc" },sort);
        page = Object.assign({},{ pageSize: 10, currentPage: 1 },page)
        let model = this.Model;
        if (data) {
            page = Object.assign({}, page, data);
            page.currentPage = Number(page.currentPage);
            page.pageSize = Number(page.pageSize);
            delete data.currentPage;
            delete data.pageSize;
        }
        let { pageSize, currentPage } = page;
        // let pageInfo = new Promise((resolve, reject)=>{
        //     resolve({
        //         currentPage: currentPage,
        //         pageSize: pageSize,
        //     })
        // })
        // return Promise.all([model.find(data).sort(sort).count(), model.find(data).sort(sort).skip((currentPage - 1) * pageSize).limit(pageSize),pageInfo])
        return Promise.all([model.find(data).count(),populatePromise?populatePromise(data,sort,currentPage-1,pageSize):model.find(data).sort(sort).skip((currentPage - 1) * pageSize).limit(pageSize)])
        // return Promise.all([model.find(data).sort(sort).count(), model.find(data).sort(sort).skip((currentPage - 1) * pageSize).limit(pageSize)])
            .then(function(results) {
                //console.log(results);
                return {
                    pageInfo:{
                        currentPage: currentPage,
                        pageSize: pageSize,
                        total:results[0],
                        pageTotal: Math.ceil(results[0]/pageSize)
                    },
                    result: results[1]
                }
            });
    }
    find(data ?: any, sort ?:any) {
        data = Object.assign({},DATA_SEARCH_DEFAULT,data);
        sort = Object.assign({},{ "_id": "desc" },sort);
        let model = this.Model;
        if (data) {
            delete data.currentPage;
            delete data.pageSize;
        }
        return model.find(data).sort(sort);
        // return new Promise(function(resolve, reject) {
        //     model.find(data).sort(sort).then((data, aa, bbaa) => {
        //         resolve(data);
        //     }).catch((error) => {
        //         reject(error);
        //     });
        // });
    }
}

const DATA_SEARCH_DEFAULT = { isDel: 0};
const DATA_SEARCH_PAGE_DEFAULT = { isDel: 0};

export default DB;

// module.exports = DB