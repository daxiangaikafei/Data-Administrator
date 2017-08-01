var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";


// 网关列表
var Schema = mongoose.Schema;
var ApiSchema = new Schema({
    url :{
        type: String,
        required: true,
        maxlength: 300,
    },
    //版本号
    version: {
        type: String,
        required: true,
        maxlength: 30
    },
    //请求方式
    method: {
        type: String,
        default:"GET",
        enum:["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"]
    },
    //描述
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    todos:{
        //是否可用
        isUse:{
            type: Boolean,
            default:true,
            required: true
        },
        //是否拦截
        isGreatWall: {
            type: Boolean,
             default:false,
            required: true
        },
        //是否登录
        isLogin: {
            type: Boolean,
            default:false,
            require: true
        },
        isRouter: {
            type: Boolean,
            default:true,
            require: true
        }
    },
    //项目id
    productId:{ type: Schema.Types.ObjectId, ref:'Product' },
    wordId:{ type: Schema.Types.ObjectId, ref:'ApiWord' },
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
    Schema: ApiSchema,
    dataBasename: "Api"
}