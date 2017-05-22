//const crypto = require('crypto');

import * as crypto from "crypto";
const moment = require("moment");
const message = "啊哈你说这个是啥，其实就是Hmac的message，干啥用的？防止你硬解的。";

// const decipher = crypto.createDecipher("md5", message);
// let decrypted = '';
// decipher.on('readable', () => {
//     const data = decipher.read();
//     if (data) 
//         decrypted += data.toString('utf8');
//     }
// );
// decipher.on('end', () => {
//     console.log(decrypted);
//     // Prints: some clear text data
// });

class Token {
    constructor() {}
    //+moment().format("YYYY-MM-DD hh:mm:ss:SSS")
    build(userId : string) {
        let hash = crypto
            .createHmac('md5', userId + moment().format("YYYY-MM-DD hh:mm:ss:SSS"))
            .update(message)
            .digest('hex');
        //都这样加密了， 你还能破解 我也是啥办法没有了
        //console.log("加密userId" + userId + ",加密后:" + hash + "长度为:" + hash.toString().length);
        return hash;
    }
    decipher(token) {
        // decipher.write(token, 'hex');
        // var a = decipher.end();
        // console.log(a)
        //crypto crypto. md
    }
}


//  let hash = crypto
//             .createHmac('des-ede3', "21312312" + moment().format("YYYY-MM-DD hh:mm:ss:SSS"))
//             .update(message)
//             .digest('hex');

// console.log("",+hash);
//                 var decipher = crypto.createDecipheriv("des-ede3", message, '');
//                let rawdata = decipher.update(hash,"hex","utf8");
//                console.log(rawdata);
               // rawdata += decipher.final(digest);


export default Token;