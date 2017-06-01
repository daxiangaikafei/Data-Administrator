var mongoose = require('mongoose');
var moment = require("moment");

var formate = "YYYY-MM-DD hhmmssSSS";

var Schema = mongoose.Schema;
var ModularSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:30,
        minlength:1
    },//模块名字
    description:{
        type:String,
        maxlength:300
    },
   // prveID
    // childrens:[{ type: Schema.Types.ObjectId, ref:'Modular' }],
    childrens:[{
        name:{
            type:String,
            required:true,
            maxlength:30,
            minlength:1
        },//模块名字
        description:{
            type:String,
            maxlength:300
        },
        childrens:[{
            name:{
                type:String,
                required:true,
                maxlength:30,
                minlength:1
            },//模块名字
            description:{
                type:String,
                maxlength:300
            },
            childrens:[{
                
            }]
        }]
    }],

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
    Schema: ModularSchema,
    dataBasename: "Modular"
}