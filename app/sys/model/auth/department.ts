var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

//部门
var Schema = mongoose.Schema;
var DepartmentSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },//用户名
    description:{
        type:String,
        maxlength:300
    },//密码
    prevId:{
        type:Schema.Types.ObjectId,
        maxlength:40
    },
    branchId:{
        type:Schema.Types.ObjectId,
        ref:"Branch"
    },
    roles:[{ type: Schema.Types.ObjectId, ref:'Role' }],
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

// DepartmentSchema.virtual('branchName').get(function(){
//     //console.log(this);
//     return "你大爷";
// })
// DepartmentSchema.pre('findOne', preFind).pre('find', preFind);

var preFind = function(){

}

// module.exports = {
//     Schema: DepartmentSchema,
//     dataBasename: "Department"
// }
module.exports = mongoose.model('Department', DepartmentSchema);