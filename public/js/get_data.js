document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const response = await fetch("/getalldata");
    if (!response.ok) {
      throw new Error("Failed to fetch data aimen ");
    }
    const data = await response.json();
    data.forEach((coord) => {
      var marker = L.marker([coord.lat, coord.long]).addTo(map);

      marker.bindPopup(
        `<b>${coord.lat}</b> , <b>${coord.long}</b>  <br> <b>${coord.region_name}</b>`
      );
      marker.on("click", (e) => {
        lat = e.latlng.lat.toFixed(3);
        long = e.latlng.lng.toFixed(3);
        search_element.value = `${lat},${long}`;
        load_data(search_element.value);
        marker.openPopup();
      });
    });

    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const populateTable = async (data) => {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${item.device_id}</th>
        <td>${item.lat}</td>
        <td>${item.long}</td>
        <td>${item.region_name || "-"}</td>
        <td>
          <button type="button" class="btn btn-outline-success">
            Select
          </button>
        </td>
      `;
    tableBody.appendChild(row);
  });
};
