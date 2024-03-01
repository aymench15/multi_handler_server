const data_temp_page = {
    labels: timePart,
    datasets: [
      {
        label: "Date : " + datePart,
        data: temp_page,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  
  // Configuration options
  const config_temp_page = {
    type: "line",
    data: data_temp_page,
    options: {},
  };
  new Chart(document.getElementById("temp_page_graph"), config_temp_page);
  