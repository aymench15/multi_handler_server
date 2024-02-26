var map = L.map("mapid").setView([34.783, 5.585], 10.5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// var marker;

// var lat;
// var long;
// var onMapClick = (e) => {
//   if (marker) {
//     map.removeLayer(marker);
//     lat = "";
//     long = "";
//   }
 
 

//   //marker = L.marker(e.latlng).addTo(map);
//   lat = e.latlng.lat.toFixed(6);
//   long = e.latlng.lng.toFixed(6);
//   document.getElementById("coordinates").textContent =
//     "Latitude: " +
//     e.latlng.lat.toFixed(6) +
//     ", Longitude: " +
//     e.latlng.lng.toFixed(6);
// };

// map.on("click", onMapClick);
var coordinatesList = [
    { lat: 34.783, lng: 5.585 },
    { lat: 34.743, lng: 5.595 },
    { lat: 34.723, lng: 5.590 },
    { lat: 34.723, lng: 5.401 },
    { lat: 34.743, lng: 5.407 },
    { lat: 34.852, lng: 5.718 },
    // Add more coordinates as needed
  ];

  // Loop through the coordinates list and add markers to the map

  

var element;
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Function to extract and format parameter values
function getParameterValues(parameterName, timeSeries) {
  const parameter = timeSeries.parameters.find((p) => p.name === parameterName);
  return parameter ? parameter.values[0] : "-";
}


var lat;
var long;
var onMapClick = (e) => {

  //marker = L.marker(e.latlng).addTo(map);
  lat = e.latlng.lat.toFixed(6);
  long = e.latlng.lng.toFixed(6);
  document.getElementById("coordinates").textContent =
    "Latitude: " +
    e.latlng.lat.toFixed(6) +
    ", Longitude: " +
    e.latlng.lng.toFixed(6);
    
};
map.on("click", onMapClick);