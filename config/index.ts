
interface Sysconfig {
    server:any,
    localServer:any;
    redis:any;
    qiniu:any;
}

import * as path from "path";
const fs = require('fs');
const env     = process.env.NODE_ENV || 'development';
// console.log(__dirname);
// console.log(path.resolve(__dirname));
// console.log(__filename);
// console.log(process.cwd());
// console.log(path.resolve('./'));
// console.log(path.resolve(__dirname, './config.json'));
// console.log(path.dirname(__filename) + '/config.json')

const sysConfig:Sysconfig = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./sysConfig.'+env+'.json')).toString());

module.exports = sysConfig;

// export default sysConfig;