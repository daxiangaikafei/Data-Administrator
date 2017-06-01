import * as crypto from "crypto";
import * as moment from "moment";
const key = "密码加密啦，呵呵哒，ll|~";

export default class PassWord {
    constructor(){

    }
    encrypt(password :String,hasTime=false){
        let content =  password+(hasTime===true?moment().format("YYYY-MM-DD hh:mm:ss:SSS"):"");
        let hash = crypto
            .createHmac('md5',content)
            .update(key)
            .digest('hex');
        return hash;
    }
}