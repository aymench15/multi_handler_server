const logData = JSON.parse(localStorage.getItem("logdata"));
console.log("from graphs : ", logData);
var time = [];
var temp = [];
var temp_page = [];
var hum_page = []
var moisture_page = []
var wind_page = []
var hum = [];
var precip = [];
var wind = [];
var moisture = [];
var datePart;
var timePart = [];
var log;
if (logData.length > 8)
  log = logData.slice(logData.length - 7, logData.length - 1);
else log = logData;
log.forEach((element) => {
  hum.push(element.humidity);
  hum_page.push(element.humidity);
  temp.push(element.temperature);
  temp_page.push(element.temperature);
  console.log(element.soil_moisture)
  moisture.push(element.soil_moisture);
  moisture_page.push(element.soil_moisture)
  wind.push(element.windspeed);
  wind_page.push(element.windspeed);
  precip.push(element.precipitation);
  datePart = element.timestamp.split("T")[0];
  timePart.push(element.timestamp.split("T")[1].split(".")[0]);
});

const data_overall = {
  labels: timePart,
  datasets: [
    {
      label: "Temperature",
      data: temp,
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
    {
      label: "Humidity",
      data: hum,
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgb(54, 162, 235)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Moisture",
      data: moisture,
      fill: true,
      backgroundColor: "rgba(243, 213, 0, 1)",
      borderColor: "rgba(243, 168, 0, 1)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Windspeed",
      data: wind,
      fill: true,
      backgroundColor: "rgba(149, 220, 216, 1)",
      borderColor: "rgba(8, 213, 215, 1)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
    {
      label: "Precipitation",
      data: precip,
      fill: true,
      backgroundColor: "rgba(243, 213, 202, 1)",
      borderColor: "rgba(230, 197, 215, 1)",
      pointBackgroundColor: "rgb(54, 162, 235)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(54, 162, 235)",
    },
  ],
};

// Configuration options
const config_overall = {
  type: "radar",
  data: data_overall,
  options: {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  },
};

new Chart(document.getElementById("overall_graph"), config_overall);


const data_hum = {
  labels: timePart,
  datasets: [
    {
      label: "Date : " + datePart,
      data: hum,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Configuration options
const config_hum = {
  type: "line",
  data: data_hum,
  options: {},
};
new Chart(document.getElementById("humidity_graph"), config_hum);

const data_temp = {
  labels: timePart,
  datasets: [
    {
      label: "Date : " + datePart,
      data: temp,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Configuration options
const config_temp = {
  type: "line",
  data: data_temp,
  options: {},
};
new Chart(document.getElementById("temperature_graph"), config_temp);

const data_wind = {
  labels: timePart,
  datasets: [
    {
      label: "Date : " + datePart,
      data: wind,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Configuration options
const config_wind = {
  type: "line",
  data: data_wind,
  options: {},
};
new Chart(document.getElementById("windspeed_graph"),config_wind);
const data_precip = {
  labels: timePart,
  datasets: [
    {
      label: "Date : " + datePart,
      data: precip,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Configuration options
const config_precip = {
  type: "line",
  data: data_precip,
  options: {},
};
new Chart(document.getElementById("precipitation_graph"), config_precip);


const data_moist = {
  labels: timePart,
  datasets: [
    {
      label: "Date : " + datePart,
      data: moisture,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Configuration options
const config_moist = {
  type: "line",
  data: data_moist,
  options: {},
};

new Chart(document.getElementById("moisture_graph"), config_moist);