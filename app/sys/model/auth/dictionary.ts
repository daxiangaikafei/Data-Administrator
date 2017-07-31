var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
//字典表
var DictionarySchema = new Schema({
    // menuTypes:[{
    //     name:String,
    //     value:String,
    //     showName:String,
    //     isDel: {
    //         type: Number,
    //         default: 0,
    //         enum:[0,1]
    //     }
    // }],
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },//叫啥名字
    primarykey:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },
    sort:{
        type:Number,
        default:100
    },
    value:{
        type:Object,
        required:true,
        maxlength:30,
        minlength:1
    },
    showName:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },
    // values:[{
    //     name:String,
    //     value:String,
    //     showName:String,
    //     isDel: {
    //         type: Number,
    //         default: 0,
    //         enum:[0,1]
    //     }
    // }],
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
    Schema: DictionarySchema,
    dataBasename: "Dictionary"

}