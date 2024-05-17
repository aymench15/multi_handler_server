const uses = require("./push_data");
const db = require("../db/pgQueries");
module.exports.verify_app_login = async (req, res) => {
  console.log(req.params.id);
  const result = await db.existingDevice(req.params.id);
  console.log(result);
  if (result == 0) {
    console.log("entred false");
    return res.json("false");
  }

  const region = await db.getCurrent_region_by_id(req.params.id);
  // const weather = await db.getForecastingData(req.params.id);
  const responsee = {
    existed: true,
    region_name: region.region_name,
    lat: region.lat,
    long: region.long,
  };
  console.log(responsee);
  res.json(responsee);
};

module.exports.get_weather_data = async (req, res) => {
  const result = await db.getWeatherData(req.params.id);
  console.log(result[0]);
  res.json(result[0]);
}
