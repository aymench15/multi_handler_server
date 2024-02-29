

// console.log(Buttons.)

const data = {
    labels: ['janvier', 'feb'],
    datasets: [{
        label: "My Dataset",
        data: [65, 59],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
    }]
  };
  
  // Configuration options
  const config = {
    type: 'line',
    data:data,
    options: {}
  };
  
  // Render the chart
  var myChart = new Chart(
    document.getElementById('temperature_graph'),
    config
  );
  