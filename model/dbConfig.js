const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: true,
  port: process.env.PGPORT || 10002,
});
client.connect();


//const res3 =  client.query(`INSERT INTO user1(id,name) VALUES (779,'akimen')`);

module.exports = client;
/* console.log(res);
    await client.end();
connectDb();*/
