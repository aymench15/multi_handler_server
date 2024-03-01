
const data_wind_page = {
    labels: timePart,
    datasets: [
      {
        label: "Date : " + datePart,
        data: wind_page,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  
  const config_wind_page = {
    type: "line",
    data: data_wind_page,
    options: {},
  };
  new Chart(document.getElementById("windspeed_page_graph"), config_wind_page);
  