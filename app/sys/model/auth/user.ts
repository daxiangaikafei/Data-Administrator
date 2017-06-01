var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        maxlength:30,
        minlength:6
    },//用户名
    password:{
        type:String,
        require:true,
        maxlength:64,
        minlength:6
    },//密码
    realName:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },
    roleName:{
        type:String,
        // required:true,
        maxlength:30,
        minlength:1
    },
    departmentName:{
        type:String,
        // required:true,
        maxlength:30,
        minlength:1
    },
    branchName:{
        type:String,
        // required:true,
        maxlength:30,
        minlength:1
    },
    officeName:{
        type:String,
        // required:true,
        maxlength:30,
        minlength:1
    },
    userGroups:[{ type: Schema.Types.ObjectId, ref:'UserGroup' }],
    departments:[{ type: Schema.Types.ObjectId, ref:'Department' }],
    status:{
        type: Number,
        default: 0,
        enum:[0,1,2,3,4,5,6,7]
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
    Schema: UserSchema,
    dataBasename: "User"

}