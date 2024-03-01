var temp = [];
var him = [];
var moisture = [];
var windspeed = [];
const logs = JSON.parse(localStorage.getItem("logdata"));
logs.forEach((element) => {
  him.push([element.timestamp, element.humidity]);
  temp.push([element.timestamp, element.temperature]);
  windspeed.push([element.timestamp,element.windspeed]);
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
if ($("#windspeed_spreadsheet").length) {
  var container = document.getElementById("windspeed_spreadsheet");
  var shheet = new Handsontable(container, {
    data: windspeed,
    rowHeaders: true,
    colHeaders: [" Time ", " windspeed (km/s) "],
    width: "100%",
    height: "100%",
    stretchH: "all",
    observeChanges: true,
    exportFile: true,
    columns: [{ data: 0 }, { data: 1 }],
    licenseKey: "non-commercial-and-evaluation",
  });
}

$("#windspeeddownloadButton").click(function () {
  shheet
    .getPlugin("exportFile")
    .downloadFile("csv", { filename: "PMS windspeed Logs" });
});

var container = document.getElementById("spreadsheet");
var sheet = new Handsontable(container, {
  data: logs,
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
