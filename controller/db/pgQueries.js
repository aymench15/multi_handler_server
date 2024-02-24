const client = require("../../model/dbConfig");
module.exports.connectDb = async () => {
    const res =  await client.query(`Select "Founded" from Public.data where "Index" = '2'`); 
    //console.log(res.rows[0].Founded);
      return res.rows[0].Founded;
  };    
  
module.exports.create = async (data) => {
  const res =  await client.query(`CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INTEGER
);`); 

  //console.log(res.rows[0].Founded);
  if(res[1]) throw err
   console.log("table created successfully !! ")
};

module.exports.insertion = async () => {
  var res =  await client.query(`INSERT INTO person (name, age) VALUES ('John Doe', 30);`); 
   res =  await client.query(`INSERT INTO person (name, age) VALUES ('Jane Smith', 25);`); 
  

  //console.log(res.rows[0].Founded);
  if(res[1]) throw err
   console.log("inserted successfully !! ")
};
module.exports.selection = async () => {
  var res =  await client.query(`SELECT * FROM person;`); 
  

  //console.log(res.rows[0].Founded);
  if(res[1]) throw err
  for(var i = 0; i < res.rows.length; i++)
   console.log(res.rows[i])
};
  module.exports.existed = async (name) => {

    
    const res =  await client.query(`Select "name" from test where "name" = '${name}'`); 
   // console.log(" \n => \n")
    //console.log(res.rows[0]);
    if(res.rows[0]!=undefined)
   {   

    //console.log("reaches ")

    return {bol:true};
  
  }
      else {
       // console.log(false)
        return {bol :false};
      }
  };  
  module.exports.insertDb = async (data) => {
    const res =  await client.query(`Insert into Public.dictionnair("word") VALUES('${data}')`); 
    //console.log(res.rows[0].Founded);
    if(res[1]) throw err
     console.log("inserted successfully")
  };
  /*
  module.exports.insertNames = async () => {
    const res =  await client.query(`Select "Name"  from Public.data`); 
   // console.log(res.rows)
    counter = 1;
    for(let i =1; i<res.rows.length; i++)
    {
      val =res.rows[i].Name;
      //console.log(' ===>>>>>>',this.existed("aimenchaib"))
     if(val != res.rows[i-1].Name){
     // console.log(" not equal")
     const res =  await client.query(`Insert into Public.dictionnair("id","word") VALUES('${counter}','${val}')`); 
      counter++;
     }
        

      

    }
   // const res1 =  await client.query(`Insert into Public.dictionnair("word") VALUES('${data}')`); 
    //console.log(res.rows[0].Founded);
    //if(res1[1]) throw err
     console.log("inserted successfully")
  };
*/
  module.exports.AutoComplete = async (word) => {

    if(word !=""){
    var data = [];
    var res =  await client.query(`Select * from Public.dictionnair where "word" like '${word}%' limit 20`);
    if(res.rows.length!=0)
     { res.rows.forEach(row => {
        data.push(row.word);
      })
    }
      else
      {
        var i =0;
        var res2;
         res =  await client.query(`Select * from Public.dictionnair where "word" like '${word.slice(0,i)}%' limit 20`);
         res2 =  await client.query(`Select * from Public.dictionnair where "word" like '${word.slice(0,i+1)}%' limit 20`);
         //console.log("word de i => ",res.rows.length)
        while(res.rows.length!= 0){
        if(res2.rows.length== 0){
        res =  await client.query(`Select * from Public.dictionnair where "word" like '${word.slice(0,i)}%' limit 20`);
        var selection = [];
        res.rows.forEach(row => {
          selection.push({word : row.word ,diff :func.levenshteinDistance(row.word,word)})
          
        })
        selection.sort((a,b)=> a.diff - b.diff);
        word = selection[0].word;
        break;
      }
i++;
      
      res2 =  await client.query(`Select * from Public.dictionnair where "word" like '${word.slice(0,i+1)}%' limit 20`);
      }
      data.push("Do you mean : ");
      data.push(word);
      //console.log("res =>",res.rows)
      
        }
      }
       
   return data;
  };

  // connectDb().then((res) => console.log(res));

  