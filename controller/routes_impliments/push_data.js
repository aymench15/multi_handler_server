const db = require("../db/pgQueries");
const ft = require("../features_functionalities/auto_completion");
const axios = require("axios");
const check = require("../features_functionalities/check_lat_long");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
          response.data.city + " (" + response.data.locality + ")",
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
            response.data.city + " (" + response.data.locality + ")",
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
  res.end();
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

module.exports.push_deployed_models = async (req, res) => {
  await db.insert_new_model(
    req.body.model_name,
    req.body.model_url,
    req.body.model_description
  );
};

module.exports.get_model_data = async (req, res) => {
  // console.log(await db.selectModeldata());

  res.json(await db.selectModeldata());
};

module.exports.get_data_for_prediction = async (req, res) => {
  const data = await db.getForecastingData(1);
  if (data.length / 12 >= 90) {
    console.log("send the data to do prediciton");
  } else {
    const firstRecordDate = data[0].timestamp;
    const result = calculateMissingDates(firstRecordDate);
    const start = result.firstMissingDate.slice(0, 10).replace(/-/g, "");
    const end = result.lastMissingDate.slice(0, 10).replace(/-/g, "");
    await axios
      .get(
        `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=SB&longitude=5.6&latitude=34.5&start=${start}&end=${end}&format=JSON`
      )
      .then((data) => {
        console.log(data.data.properties.parameter);
      });
  }
  // data.forEach((row) => {
  //   console.log(row.timestamp)
  // })
  console.log(data[0].timestamp);
  return res.json(data);
};

const calculateMissingDates = (firstRecordDate) => {
  const currentDate = new Date();
  //const currentDate = new Date('2024-03-14T23:32:20.714Z');
  // Calculate the difference in milliseconds
  const differenceInMs = currentDate - new Date(firstRecordDate);
  console.log(differenceInMs);
  // Convert milliseconds to days
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  console.log(differenceInDays);

  if (differenceInDays < 90) {
    // Calculate the number of missing records
    const missingRecords = 90 - differenceInDays;

    // Calculate the date of the last record before the missing ones
    const startDate = new Date(firstRecordDate);
    startDate.setDate(startDate.getDate() - missingRecords);

    // Calculate the date where, after adding 90 days' worth of records, you would have continuous data
    const endDate = new Date(firstRecordDate);
    endDate.setDate(endDate.getDate() - 1);

    return {
      firstMissingDate: startDate.toISOString().split("T")[0],
      lastMissingDate: endDate.toISOString().split("T")[0],
    };
  } else {
    // Sufficient data present
    return {
      verificationStatus: "You have sufficient data to do the prediction",
    };
  }
};

module.exports.post_login = async (req, res) => {
  const maxAge = 24 * 60 * 60 * 1000;
  const pass = await db.login();
  await bcrypt.compare(req.body.password, pass.password).then((equal) => {
    if (equal) {
      const id = 1;
      const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
      req.flash("success_msg", "Succes");
      res.status(201).json({ succes: "successfully" });
    } else {
      console.log("reached");
      req.flash("error_msg", "Sign in Failed");
      res.json({ error: "Password is wrong" });
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).redirect("/");
};

// const csvFilePath = 'Hadjeb.csv'; // Replace this with your CSV file path

// // Read the CSV file line by line
// const readInterface = readline.createInterface({
//   input: fs.createReadStream(csvFilePath),
//   console: false
// });

// // Initialize a counter to keep track of the current line
// let lineCounter = 0;

// // Function to process each line
// function processLine() {
//   // Read the next line from the CSV file
//   readInterface.once('line', function(line) {
//     // Increment the line counter
//     lineCounter++;

//     // Parse the CSV line
//     const [device_id, lat, long, temperature, humidity, windspeed, wind_direction, precipitation, soil_moisture, dew_points, uv_index] = line.split(',');
//     console.log(device_id, lat, long, temperature, humidity, windspeed, wind_direction, precipitation, soil_moisture, dew_points, uv_index)
//     // Construct the SQL query to insert data into the database
//     const query = {
//       text: 'INSERT INTO your_table_name (device_id, lat, long, temperature, humidity, windspeed, wind_direction, precipitation, soil_moisture, dew_points, uv_index) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
//       values: [parseInt(device_id), parseFloat(lat), parseFloat(long), parseFloat(temperature), parseFloat(humidity), parseFloat(windspeed), parseInt(wind_direction), parseFloat(precipitation), parseFloat(soil_moisture), parseFloat(dew_points), parseFloat(uv_index)],
//     };

//     // Execute the SQL query
//     client.query(query, (err, res) => {
//       if (err) {
//         console.error('Error executing query', err.stack);
//       } else {
//         console.log(`Line ${lineCounter} inserted successfully`);
//       }

//       // Process the next line after 1 second
//       setTimeout(processLine, 1000);
//     });
//   });
// }


// // Start processing the first line
//  processLine();







// push admin password


// const pass = async () =>{
//   const password = "univ-biskra2024"
// const salt =  await bcrypt.genSalt(10);
// const hashpass = await bcrypt.hash(password , salt);
// return await db.ins(hashpass)
// }

// pass().then(() =>{
//   console.log('passed')
// }).catch(err =>console.error('Error'))