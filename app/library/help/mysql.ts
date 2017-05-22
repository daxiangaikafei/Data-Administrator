var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '192.168.132.43',
  user            : 'develop',
  password        : 'Hello!@#4',
  database        : 'node_permision'
});

//let connection;



// var getConnection = function(){
//   return new Promise((resolve,reject)=>{
//       pool.getConnection(function(err, connection) {
//         if(err===undefined){
//           resolve(connection)
//         }else{
//           reject(err)
//         }
//       });
//   })
// };

// (async function(){
//   console.log("1111")
//   connection = await getConnection();
//    console.log("222222")
// })();


 console.log("33333")
pool.getConnection(function(err, connection) {
    
});



// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// pool.query('SELECT * from `user`', function (error, results, fields) {
  
//   if (error) throw error;
//   console.log('The solution is: ', results[0].id);
// });

export default pool;