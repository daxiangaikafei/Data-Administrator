import * as winston from "winston";
import * as path from "path";
require('winston-daily-rotate-file')
// winston.configure({     transports: [
// new(winston.transports.Console)(),
// new(winston.transports.File)({filename: 'app.log'})     ] });

var log = new(winston.Logger)({
  transports: [//   new (winston.transports.Console)(),

    // new winston.transports.DailyRotateFile({filename: 'request', datePattern: '_yyyy-MM-ddTHH.log'})
    // new(winston.transports.File)({filename: 'request.log'})
    new winston.transports.DailyRotateFile({
      filename: path.resolve(process.cwd(),'./log/request'),
      datePattern: '_yyyy-MM-ddTHH.log'
    })
    ]
});

// winston.add(winston.transports.File, {filename: 'app.log'});
// winston.remove(winston.transports.Console); winston.log('info', 'Hello
// distributed log files!'); winston.log('info', 'Test Log Message', { anything:
// 'This is metadata' }); function logs(){     new Promise(()=>{     }) }

const logger = function () {
  // log.info('info', 'Hello distributed log files!'); console.log("this",this)
  return async function (ctx, next) {
    // //console.log(ctx.request);
    let {request} = ctx;
    let userId = "";
    let _startTime = Date.now()
    // return next();
    try {
      await next();
      userId = (ctx.state.useInfo && ctx.state.useInfo.userId) || "";
    } catch (error) {
      ctx.status = 500;
      log.error(error.name, "...", {
        "pid": process.pid,
        "uid": process.getuid(),
        userId,
        error: {
          ...error
        },
        time: Date.now() - _startTime + "ms"
      })
      ctx.throw(error.Message, 500);
      console.error(error);

    } finally {
      log[getLogLevel(ctx.status)]("request", "....", {
        "pid": process.pid,
        "uid": process.getuid(),
        userId,
        "req": {
          "header": ctx.request.header,
          "ip": request.ip,
          "body": request.body,
          "originalUrl": request.originalUrl,
          "method":request.method
        },
        time: Date.now() - _startTime + "ms",
        "res":ctx.res,

      });
    }

    // log[getLogLevel(ctx.status)]("request","....",{"header":ctx.request.header,"i
    // p":request.ip,"body":request.body,"originalUrl":request.originalUrl,"pid":proc
    // ess.pid,"uid":process.getuid()}); let info = {
    // "request":{"header":ctx.request.header,"ip":request.ip,"body":request.body,"or
    // iginalUrl":request.originalUrl,"pid":process.pid,"uid":process.getuid()},
    // "rev":{"status":ctx.status} }; console.log(JSON.stringify(info))

  }
}

const getLogLevel = (statusCode = 200, defaultLevel = 'info') => {
  switch (parseInt((statusCode / 100).toString(), 10)) {
    case 5:
      return 'error';
    case 4:
      return 'warn';
    default:
      return defaultLevel;
  }
};

export default logger;
// module.exports = logger;