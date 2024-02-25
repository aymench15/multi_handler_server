const db = require("../db/pgQueries");

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