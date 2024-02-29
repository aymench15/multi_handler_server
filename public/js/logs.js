// // const logs = document.getElementById("logs");

// // // Attach event listener to the anchor tag
// // logs.addEventListener('click', async (event) =>{
// //   // Prevent the default action (i.e., following the link)
// //   event.preventDefault();

// // post_data('logs')
// // });

// const post_data =async   (page) =>{
//     console.log("actions")
// var data = Buttons.forecast_data

//     // Send an HTTP request to your server
//    await fetch(`/${page}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({data}),
//     })
//     .then(response => {
//       // Handle the response from the server if needed
//       console.log('Response received:', response);
//     })
//     .catch(error => {
//       // Handle any errors that occur during the request
//       console.error('Error:', error);

//   });

// }
var temp = [];
var him = [];
var moisture = [];
const logData = JSON.parse(localStorage.getItem("logdata"));
logData.forEach((element) => {
  him.push([element.timestamp, element.humidity]);
  temp.push([element.timestamp, element.temperature]);

  moisture.push([element.timestamp, element.soil_moisture]);
});
if ($("#humidity_spreadsheet").length) {
  console.log("2", him);
  var container = document.getElementById("humidity_spreadsheet");
  var sheettt = new Handsontable(container, {
    data: him,
    rowHeaders: true,
    colHeaders: [" Time ", " Humidity (%) "],
    width: "100%",
    height: "100%",
    stretchH: "all",
    observeChanges: true,
    exportFile: true,
    columns: [{ data: 0 }, { data: 1 }],
    licenseKey: "non-commercial-and-evaluation",
  });
}

$("#humiditydownloadButton").click(function () {
  sheettt
    .getPlugin("exportFile")
    .downloadFile("csv", { filename: "PMS Humidity Logs" });
});
if ($("#temperature_spreadsheet").length) {
 
  console.log(temp);
  var container = document.getElementById("temperature_spreadsheet");
  var sheett = new Handsontable(container, {
    data: temp,
    rowHeaders: true,
    colHeaders: [" Time ", " Temperature (°C) "],
    width: "100%",
    height: "100%",
    stretchH: "all",
    observeChanges: true,
    exportFile: true,
    columns: [{ data: 0 }, { data: 1 }],
    licenseKey: "non-commercial-and-evaluation",
  });
}
$("#temperaturedownloadButton").click(() => {
  sheett
    .getPlugin("exportFile")
    .downloadFile("csv", { filename: "Temperature Logs" });
});

if ($("#moisture_spreadsheet").length) {
  var container = document.getElementById("moisture_spreadsheet");
  var sheet = new Handsontable(container, {
    data: moisture,
    rowHeaders: true,
    colHeaders: [" Time ", " Moisture (%) "],
    width: "100%",
    height: "100%",
    stretchH: "all",
    observeChanges: true,
    exportFile: true,
    columns: [{ data: 0 }, { data: 1 }],
    licenseKey: "non-commercial-and-evaluation",
  });
}

$("#moisturedownloadButton").click(function () {
  sheet
    .getPlugin("exportFile")
    .downloadFile("csv", { filename: "PMS Moisture Logs" });
});
// if ($("#sunlight_spreadsheet").length) {
//               var container = document.getElementById("sunlight_spreadsheet");
//               var sheet = new Handsontable(container, {
//                 data: sheetslogs,
//                 rowHeaders: true,
//                 colHeaders: ["", " Sunlight (hours) "],
//                 width: "100%",
//                 height: "100%",
//                 stretchH: "all",
//                 observeChanges: true,
//                 exportFile: true,
//                 columns: [{ data: 0 }, { data: 4 }],
//                 fixedColumnsLeft: 1,
//                 licenseKey: "non-commercial-and-evaluation",
//               });
//             }
  
//             $("#sunlightdownloadButton").click(function () {
//               sheet
//                 .getPlugin("exportFile")
//                 .downloadFile("csv", { filename: "PMS Sunlight Logs" });
//             });


var container = document.getElementById("spreadsheet");
var sheet = new Handsontable(container, {
  data: logData,
  rowHeaders: true,
  colHeaders: [
    " Id ",
    " Time ",
    " Temperature (°C) ",
    " Humidity (%) ",
    " Windspeed (km/h)",
    " Wind direction ",
    " Precipitation (ml)",
    " Moisture (%) ",
    " Dew points (ml) ",
    " UV index (%) ",
  ],
  width: "100%",
  height: "100%",
  stretchH: "all",
  observeChanges: true,
  exportFile: true,
  licenseKey: "non-commercial-and-evaluation",
});

$("#downloadlogsButton").click(() => {
  sheet
    .getPlugin("exportFile")
    .downloadFile("csv", { filename: "PMS Server Logs" });
});
