const client = require("../../model/dbConfig");

module.exports.existingDevice = async (deviceId) => {
  const existing = await client.query(
    "SELECT device_id FROM iot_device WHERE device_id = $1",
    [deviceId]
  );
  if (existing.rowCount === 0) {
    console.error("Error: Device does not exist.");
    await client.query("ROLLBACK");
    return 0;
  }
  //console.log(res.rows[0].Founded);
  return 1;
};

module.exports.insert_new_device = async (device_id, lat, long) => {
  const res = await client.query(
    "INSERT INTO iot_device(device_id,lat,long) VALUES ($1,$2,$3)",
    [device_id, lat, long]
  );

  //console.log(res.rows[0].Founded);
  if (res[1]) throw err;
  console.log("Device instace inserted successfully !! ");
};
module.exports.insert_new_region = async (
  lat,
  long,
  region_name,
  device_id
) => {
  const res = await client.query(
    "INSERT INTO current_region(lat,long,region_name,device_id) VALUES ($1,$2,$3,$4)",
    [lat, long, region_name, device_id]
  );

  //console.log(res.rows[0].Founded);
  if (res[1]) throw err;
  console.log("region instace inserted successfully !! ");
};

module.exports.insert_current_data = async (
  device_id,
  temperature,
  humidity,
  windspeed,
  wind_direction,
  precipitation,
  soil_moisture,
  dew_points,
  uv_index
) => {
  const res = await client.query(
    "INSERT INTO data_forecasting (device_id, timestamp, temperature, humidity, windspeed, wind_direction, precipitation, soil_moisture, dew_points, uv_index) VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4, $5, $6, $7, $8, $9);",
    [
      device_id,
      temperature,
      humidity,
      windspeed,
      wind_direction,
      precipitation,
      soil_moisture,
      dew_points,
      uv_index,
    ]
  );

  //console.log(res.rows[0].Founded);
  if (res[1]) throw err;
  console.log("Current data inserted successfully !! ");
};

module.exports.getLatLng = async (id_device) => {
  var res = await client.query(
    `SELECT lat,long FROM current_region where device_id=${id_device};`
  );
  if (res[1]) throw err;
  
  return res.rows[res.rows.length-1];
};

module.exports.selectAlldata = async () => {
  const res = await client.query(`Select * FROM current_region;`);
  //console.log(res.rows[0].Founded);
  if (res[1]) throw err;
  return res.rows;
};

module.exports.AutoComplete = async (lat, long) => {
  console.log(lat, long);
  lat = 33;
  long = 5;
  if (lat != "") {
    var data = [];
    var res = await client.query(
      `Select * from iot_device where "lat" like '${lat}%' and "long" like '${long}%' limit 20`
    );
    console.log(res.rows);
    /*
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
      
        }*/
  }
  return res.rows;
  // return data;
};

// connectDb().then((res) => console.log(res));
