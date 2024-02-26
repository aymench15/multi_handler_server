const db = require("../db/pgQueries");
const ft = require('../features_functionalities/auto_completion')


module.exports.pushData_api = async (req, res) => {
    //res.render("actions");
const result = await db.existingDevice(req.body.device_id);
if (result == 0){
    await db.insert_new_device(req.body.device_id,req.body.lat,req.body.long)
    await db.insert_new_region(req.body.lat,req.body.long,req.body.region_name,req.body.device_id)
    await db.insert_current_data(req.body.device_id, req.body.temperature, req.body.humidity, req.body.windspeed, req.body.wind_direction, req.body.precipitation, req.body.soil_moisture, req.body.dew_points,req.body.uv_index)
}
else await db.insert_current_data(req.body.device_id, req.body.temperature, req.body.humidity, req.body.windspeed, req.body.wind_direction, req.body.precipitation, req.body.soil_moisture, req.body.dew_points,req.body.uv_index)



  };

  module.exports.auto_complete = async (req, res) => {
   // console.log(req.body.query)
    if(req.body.query !='' )
    console.log('rrrrrrr ',await ft.auto_cmplt(req.body.query))  
  }



  module.exports.get_all_data = async (req,res) =>{
    console.log(await db.selectAlldata())
   res.json(await db.selectAlldata())
 }