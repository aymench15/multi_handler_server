const connect = require("../../model/dbConfig");
/*
module.exports.try = async (sql,params) => {
  const [rows] = await(await connect).query(sql,params);
  const row = rows[0];
  console.log(row.id)
  return  [rows];
  
};
*/
module.exports.addFile = async (fileName) => {
  const sql = `INSERT INTO documents(title) VALUES (?)`;
  const state = await (await connect).execute(sql, [fileName]);
  if (state[1]) throw err;
  console.log("1 document inserted ");
};
module.exports.getAllIds = async () => {
  const sql = `SELECT id from documents`;
  const [rows] = await (await connect).query(sql);
  return await rows;
};
module.exports.getAllWords = async (id) => {
  const sql = `SELECT nbr_occ from process where id = ?`;
  const [rows] = await (await connect).query(sql, id);
  return await rows;
};

const getFileName = async (id) => {
  const sql = `SELECT title from documents where id = ?`;
  // const conn = await connect.connection();
  const [rows] = await (await connect).query(sql, id);
  return rows[0].title;
};

module.exports.getFile = async (id) => {
  const sql = `SELECT title from documents where id = ?`;
  // const conn = await connect.connection();
  const [rows] = await (await connect).query(sql, id);
  return rows[0].title;
};

module.exports.savefile = async (array) => {
  for (var i = 0; i < array.length; i++) {
    const sql = `SELECT id from documents where title = ?`;
    const [rows] = await (await connect).query(sql, array[i].fName);
    array[i].fName = rows[0].id;
  }
  return await addRecord(array);
};
module.exports.fillArray = async (word) => {
  var array = [];
  const sql = `SELECT id,nbr_occ from process where word = ?`;
  const [rows] = await (await connect).query(sql, word);
  for (var i = 0; i < rows.length; i++) {
    //console.log();
    array.push({ row: await rows[i], fName: await getFileName(rows[i].id) });
  }
  return array;
  /*
        
        (err, result) =>{
          if (err) throw err;
          for(var i =0;i<result.length;i++){
           getFileName(obj,j,list,result[i].id,result[i].nbr_occ,(resultt,id,nbr,obj,j,list)=>{
     
            array.push({name:resultt,id:id,nbr:nbr});
            if(i== result.length){
              console.log('array',array)
              obj.setArray(array);
              return callback(obj,j,list);
            }
            
            })
            
          }
          
        });*/
};
const addRecord = async (array) => {
  var p_array = [];
  for (var i = 0; i < array.length; i++) {
    const sql = `INSERT INTO process(word,nbr_occ,id) VALUES (?,?,?)`;
    const state = await (
      await connect
    ).execute(sql, [array[i].word, array[i].nbr_occ, array[i].fName]);
    if (state[1]) throw err;
    p_array.push(state);
  }
  return Promise.all(p_array);
  //  console.log("1 process inserted ")
};
/*
module.exports.fillArray =(obj,j,list,callback)=>{
var array = [];
    const sql = `SELECT id,nbr_occ from process where word = ?`;
    
     connect.query(sql,obj.name,(err, result) =>{
        if (err) throw err;
        for(var i =0;i<result.length;i++){
         getFileName(obj,j,list,result[i].id,result[i].nbr_occ,(resultt,id,nbr,obj,j,list)=>{
   
          array.push({name:resultt,id:id,nbr:nbr});
          if(i== result.length){
            console.log('array',array)
            obj.setArray(array);
            return callback(obj,j,list);
          }
          
          })
          
        }
        
      });
}*/
