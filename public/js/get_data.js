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
        lat = e.latlng.lat;
        long = e.latlng.lng;
        search_element.value = `${lat},${long}`;
        load_data(search_element.value);
        marker.openPopup();
      });
    });

    populateTable(data);
    handleButtonClick("B1");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const populateTable = async (data) => {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${item.device_id}</th>
        <td>${item.lat}</td>
        <td>${item.long}</td>
        <td>${item.region_name || "-"}</td>
        <td>
          <button id="B${
            item.device_id
          }" type="button" class="btn btn-outline-success">
            Select
          </button>
        </td>
      `;
    tableBody.appendChild(row);
    const button = document.getElementById(`B${item.device_id}`);
    button.addEventListener("click", () => {
      handleButtonClick(`B${item.device_id}`);
    });

    // Initialize selectedButtonId if the button is initially selected
    if (item.selected) {
      Buttons.staticProperty = `B${item.device_id}`;
    }
  });
};

const handleButtonClick = (buttonId) => {
  console.log(buttonId);
  if (Buttons.staticProperty === buttonId) {
    console.log("here 1");
    const button = document.getElementById(buttonId);
    button.textContent = "Selected";
    button.style.backgroundColor = "green";
    button.style.color = "white";
    button.classList.add("selected");
  }

  // Deselect the currently selected button (if any)
  if (Buttons.staticProperty !== null) {
    console.log("here 2");
    const button1 = document.getElementById(Buttons.staticProperty);
    button1.textContent = "Select";
    button1.style.backgroundColor = "white";
    button1.style.color = "green";
    const prevSelectedButton = document.getElementById(Buttons.staticProperty);
    prevSelectedButton.classList.remove("selected");
  }

  console.log("here 3");
  // Select the clicked button
  const button = document.getElementById(buttonId);

  button.textContent = "Selected";
  button.style.backgroundColor = "green";
  // Set text color to white
  button.style.color = "white";
  button.classList.add("selected");
  Buttons.staticProperty = `${buttonId}`;
};

class Buttons {
  static staticProperty = null;
}
