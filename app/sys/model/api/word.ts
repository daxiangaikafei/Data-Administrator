var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
var ApiWordSchema = new Schema({
    //url地址
    url: {
        type: String,
        required: true,
        maxlength: 100
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
        default:"GET",
        enum:["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"]
    },
    //描述
    description: {
        type: String,
        required: true,
        maxlength: 300
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

// module.exports = {
//     Schema: ApiWordSchema,
//     dataBasename: "ApiWord"
// }

module.exports = mongoose.model('ApiWord', ApiWordSchema);