const db = require("../db/pgQueries");
const ft = require("../features_functionalities/auto_completion");
const axios = require("axios");
const check = require("../features_functionalities/check_lat_long");
module.exports.pushData_api = async (req, res) => {
  //res.render("actions");

  const result = await db.existingDevice(req.body.device_id);
  if (result == 0) {
    console.log("here i am =====   1");
    await db.insert_new_device(req.body.device_id, req.body.lat, req.body.long);
    await axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${req.body.lat}&longitude=${req.body.long}&localityLanguage=en`
      )
      .then(async (response) => {
        await db.insert_new_region(
          req.body.lat,
          req.body.long,
          response.data.city+' ('+response.data.locality+')',
          req.body.device_id
        ); // The response data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    await db.insert_current_data(
      req.body.device_id,
      req.body.temperature,
      req.body.humidity,
      req.body.windspeed,
      req.body.wind_direction,
      req.body.precipitation,
      req.body.soil_moisture,
      req.body.dew_points,
      req.body.uv_index
    );
  } else {
    const res = await db.getLatLng(req.body.device_id);
    console.log(res);
    const checking = check.checkAreaChange(
      req.body.lat,
      req.body.long,
      res.lat,
      res.long
    );
    if (checking == 1) {
      console.log("here i am ===== 2");
      await axios
        .get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${req.body.lat}&longitude=${req.body.long}&localityLanguage=en`
        )
        .then(async (response) => {
          console.log(response.data.locality);
          await db.insert_new_region(
            req.body.lat,
            req.body.long,
            response.data.city+' ('+response.data.locality+')',
            req.body.device_id
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      await db.insert_current_data(
        req.body.device_id,
        req.body.temperature,
        req.body.humidity,
        req.body.windspeed,
        req.body.wind_direction,
        req.body.precipitation,
        req.body.soil_moisture,
        req.body.dew_points,
        req.body.uv_index
      );
    } else {
      console.log("here i am =====   3");
      await db.insert_current_data(
        req.body.device_id,
        req.body.temperature,
        req.body.humidity,
        req.body.windspeed,
        req.body.wind_direction,
        req.body.precipitation,
        req.body.soil_moisture,
        req.body.dew_points,
        req.body.uv_index
      );
    }
  }
};

module.exports.auto_complete = async (req, res) => {
  res.json(
    await ft.auto_cmplt(
      extractWords(req.body.query)[0],
      extractWords(req.body.query)[1]
    )
  );
};

module.exports.get_all_data = async (req, res) => {
 // console.log(await db.selectAlldata());

  res.json(await db.selectAlldata());
};
module.exports.getforecastingdata = async (req, res) => {
   //console.log(await db.selectAlldata());
   res.json(await db.getForecastingData(req.body.buttonId));
 };


const extractWords = (str) => {
  if (str.includes(",")) {
    return str.split(",").map((word) => word.trim());
  }

  return [str, ""];
};
