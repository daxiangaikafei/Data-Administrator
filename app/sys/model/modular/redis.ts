var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
var GatewaySchema = new Schema({
    //
    url :{
        type: String,
        required: true,
        maxlength: 300,
    },
    //是否可用
    isUse:{
        type: Boolean,
        required: true
    },
    //是否拦截
    isGreatWall: {
        type: Boolean,
        required: true
    },
    //是否登录
    isLogin: {
        type: Boolean,
        require: true
    },
    //版本号
    version: {
        type: String,
        required: true,
        maxlength: 30
    },
    //项目
    product: {
        type: String,
        required: true,
        maxlength: 30
    },
    //描述
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    //文档地址
    docmentUrl: {
        type: String,
        required: true,
        maxlength: 100
    },
    //请求方式GET/POST/PUT/DELETE/
    method: {
        type: String,
        required: true,
        maxlength: 30
    },
    createBy:{
        type:String,
        required:true,
        maxlength:32,
        minlength:6
    },
    createTime:{
        type: Date,
        default: moment()
    },
    upBy:{
        type: String,
        required:true,
        maxlength:32,
        minlength:6
    },
    upTime: {
        type: Date,
        default: moment()
    },
    isDel: {
        type: Number,
        default: 0,
        enum:[0,1]
    }
});

module.exports = {
    Schema: GatewaySchema,
    dataBasename: "Gateway"
}