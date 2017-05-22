var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
var PermissionsSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },//用户名
    description:{
        type:String,
        maxlength:300
    },
    type:{
        type:String,
        maxlength:30
    },
    isVisible:{
        type: Number,
        default: 0,
        enum:[0,1]
    },
    status:{
        type: Number,
        default: 0,
        enum:[0,1,2,3,4,5,6,7]
    },
    createBy:{
        type:String,
        required:true,
        maxlength:30,
        minlength:6
    },
    createTime:{
        type: Date,
        default: moment()
    },
    upBy:{
        type: String,
        required:true,
        maxlength:30,
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
    Schema: PermissionsSchema,
    dataBasename: "Permissions"
}