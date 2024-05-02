const data_moisture_page = {
    labels: timePart,
    datasets: [
      {
        label: "Date : " + datePart,
        data: moisture_page,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  
  // Configuration options
  const config_moisture_page = {
    type: "line",
    data: data_moisture_page,
    options: {},
  };
  console.log('======',data_moisture_page)
  new Chart(document.getElementById("moisture_page_graph"), config_moisture_page);
  