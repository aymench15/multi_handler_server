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
        console.log("clickes marker - ", search_element.value);

        marker.openPopup();
        load_data(search_element.value);
      });
    });

    populateTable(data);

    if (Buttons.staticProperty == null)
    {
      handleButtonClick("B1");
      Buttons.forecast_data = get_forecast_data("B1")
    } 
    else
    {
       handleButtonClick(Buttons.staticProperty);
       Buttons.forecast_data = get_forecast_data(Buttons.staticProperty)
    }
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
      Buttons.forecast_data = get_forecast_data(`B${item.device_id}`)
    });
  });
};

const handleButtonClick = async (buttonId) => {
  if (Buttons.staticProperty !== null) {
    if (Buttons.staticProperty !== buttonId) {
      if (document.getElementById(Buttons.staticProperty) != null) {
        const button1 = document.getElementById(Buttons.staticProperty);

        //button1.textContent = "Select";
        button1.style.backgroundColor = "white";
        button1.style.color = "green";
        button1.classList.remove("selected");
      }
      const button = document.getElementById(buttonId);
      button.textContent = "Selected";
      button.style.backgroundColor = "green";
      button.style.color = "white";
      button.classList.add("selected");
      Buttons.staticProperty = buttonId;
    } else {
      const button = document.getElementById(buttonId);
      button.textContent = "Selected";
      button.style.backgroundColor = "green";
      button.style.color = "white";
      button.classList.add("selected");
      console.log("here 2  ", buttonId);
      Buttons.staticProperty = buttonId;
    }
    // Deselect the currently selected button (if any)
  } else {
    // Select the clicked button
    const button = document.getElementById(buttonId);

    button.textContent = "Selected";
    button.style.backgroundColor = "green";
    // Set text color to white
    button.style.color = "white";
    button.classList.add("selected");
    Buttons.staticProperty = buttonId;
  }

};

const get_forecast_data = async (buttonId) =>{
  try {
    buttonId = buttonId.match(/\d+/)[0]
    const response = await fetch("/getforecastingdata", {
      method: "POST",
      body: JSON.stringify({buttonId}),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data aimen ");
    }
    const data = await response.json();
    // var container = document.getElementById("spreadsheet");
    //             var sheet = new Handsontable(container, {
    //               data: data,
    //               rowHeaders: true,
    //               colHeaders: [
    //                 "",
    //                 " Temperature (°C) ",
    //                 " Humidity (%) ",
    //                 " Moisture (%) ",
    //                 " Sunlight (hours) ",
    //                 " Water Level (%) ",
    //               ],
    //               width: "100%",
    //               height: "100%",
    //               stretchH: "all",
    //               observeChanges: true,
    //               exportFile: true,
    //               licenseKey: "non-commercial-and-evaluation",
    //             });
    console.log(data);
  } catch (error) {
    throw new Error("Failed to bring data depend on the button selected");
  }
}

class Buttons {
  static staticProperty = null;
  static forecast_data = null
}
