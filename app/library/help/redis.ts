
interface Sysconfig {
    server:any,
    localServer:any;
    redis:any;
    qiniu:any;
}
import * as Redis from "ioredis";

let redisConfig:Sysconfig = require("./../../../config/index");
let redis = new Redis(redisConfig.redis);

//let redis = new Redis.Cluster(redisConfig.redis.sentinels,redisConfig.redis.options);


// class Redis {
//     constructor(){

//     }
// }

// redis.mset({ k1: 'v1', k2: 'v2' });
// redis.get('k1', function (err, result) {
//   // result === 'v1';
//   console.log("1:"+result);
// });

// // redis.mset(new Map([['k3', 'v3'], ['k4', 'v4']]));
// // redis.get('k3', function (err, result) {
// //   // result === 'v3';
// //   console.log("2:"+result);
// // });


// redis.set('foo', 'bar');
// redis.expire('foo',10);
// redis.get('foo', function (err, result) {
//   console.log(result);
// });
//var redis = new Redis();
// var pub = new Redis(redisConfig.redis);
// redis.subscribe('news', 'music', function (err, count) {
//   // Now we are subscribed to both the 'news' and 'music' channels.
//   // `count` represents the number of channels we are currently subscribed to.

//   pub.publish('news', 'Hello world!');
//   pub.publish('music', 'Hello again!');
// });

// redis.on('message', function (channel, message) {
//   // Receive message Hello world! from channel news
//   // Receive message Hello again! from channel music
//   console.log('Receive message %s from channel %s', message, channel);
// });

// // There's also an event called 'messageBuffer', which is the same as 'message' except
// // it returns buffers instead of strings.
// redis.on('messageBuffer', function (channel, message) {
//   // Both `channel` and `message` are buffers.
//   console.log(channel,message);
// });
// console.log("........");

export default redis;
