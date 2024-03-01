const data_hum_page = {
    labels: timePart,
    datasets: [
      {
        label: "Date : " + datePart,
        data: hum_page,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  
  
  // Configuration options
  const config_hum_page = {
    type: "line",
    data: data_hum_page,
    options: {},
  };
  new Chart(document.getElementById("hum_page_graph"), config_hum_page);
