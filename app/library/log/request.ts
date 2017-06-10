import * as winston from "winston";

// winston.configure({     transports: [
// new(winston.transports.Console)(),
// new(winston.transports.File)({filename: 'app.log'})     ] });

var log = new(winston.Logger)({
  transports: [//   new (winston.transports.Console)(),
    new(winston.transports.File)({filename: 'request.log'})]
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
        }
      })
      ctx.throw(error.Message, 500);

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
        }
        // "res":{...ctx.res},

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
  switch (parseInt(statusCode / 100, 10)) {
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