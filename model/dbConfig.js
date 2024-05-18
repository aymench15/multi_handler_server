const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = `postgres://${process.env.PGUSERR}:${process.env.PGPASSWORDD}@${process.env.PGHOSTT}/${process.env.PGDATABASEE}`;
const client = new Client({
  // user: process.env.PGUSERR,
  // host: process.env.PGHOSTT,
  // database: process.env.PGDATABASEE,
  // password: process.env.PGPASSWORDD,
  // port: process.env.PGPORTT,
  ssl: true,
  connectionString: connectionString,
});
client.connect();

//const res3 =  client.query(`INSERT INTO user1(id,name) VALUES (779,'akimen')`);

module.exports = client;
/* console.log(res);
    await client.end();
connectDb();*/
