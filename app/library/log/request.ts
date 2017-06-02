import        *             as         winston    from       "winston";




// winston.configure({
//     transports: [
//         new(winston.transports.Console)(),
//         new(winston.transports.File)({filename: 'app.log'})
//     ]
// });

var log = new (winston.Logger)({
    transports: [
    //   new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'request.log' })
    ]
});


// winston.add(winston.transports.File, {filename: 'app.log'});
// winston.remove(winston.transports.Console);

// winston.log('info', 'Hello distributed log files!');
// winston.log('info', 'Test Log Message', { anything: 'This is metadata' });

// function logs(){
//     new Promise(()=>{

//     })
// }

const logger = function(){
    log.info('info', 'Hello distributed log files!');
    

    return function(ctx,next){
        // //console.log(ctx.request);
        let {request} = ctx;
        log.info("request","详情",{"header":ctx.request.header,"ip":request.ip,"body":request.body,"originalUrl":request.originalUrl,pid:process.pid,uid:process.getuid()});
        return next();
    }
}


export default logger;
// module.exports = logger;