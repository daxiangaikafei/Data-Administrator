import        *             as         winston    from       "winston";






var log = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'normal.log' })
    ]
  });



const logger = function(){
    return log;
}

var Logger = {
    error:function(param1 ?:any,param2 ?:any,param3 ?:any){
        param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.error(param1,param2,param3);
    },
    info:function(param1 ?:any,param2 ?:any,param3 ?:any){
         param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.error(param1,param2,param3);
    },
    warn:function(param1 ?:any,param2 ?:any,param3 ?:any){
         param3 = Object.assign({},param3,{
            pid:process.pid,uid:process.getuid(),
        })
        return log.error(param1,param2,param3);
    }
}


export default Logger;
// module.exports = logger;