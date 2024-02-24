const connect = require('./dbConfig');
const connect2 = require("./pgQueries");
console.log(connect2.connectDb());

const getany = async (id) =>  {
    const sql = `SELECT title from documents where id = ?`;
    
var [result] =  await connect.query(sql,id,(err, result));
return result;
}

