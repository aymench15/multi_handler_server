const get_models_data = async () => {
  try {
    const response = await fetch("/getmodeldata");
    if (!response.ok) {
      throw new Error("Failed to fetch data aimen ");
    }
    const data = await response.json();
    get_models(data);
  } catch (e) {
    console.log(e);
  }
};

get_models_data();
console.log("create new model !!");
const new_model_btn = document.getElementById("new_model");

new_model_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const model_name = document.getElementById("model_name").value;
  const model_url = document.getElementById("model_url").value;
  const model_description = document.getElementById("model_description").value;
  const fileInput = document.getElementById("inputGroupFile02");
  try {
    const file = fileInput.files[0];
    console.log("file ", file);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/change_model", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    response.text().then(async (data) => {
      if (data == "deployed successfully") {
        console.log("deployed successfully ", data);
        try {
          const response = await fetch("/push_model", {
            method: "POST",
            body: JSON.stringify({ model_name, model_url, model_description }),
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const deployment_state = document.getElementById('deployment_state')
          deployment_state.innerText = data
          const responseData = await response.json();
          console.log(responseData);

          model_name.innerText = "";
          model_url.innerText = "";
          model_description.innerText = "";
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  } catch (e) {
    console.log(e.message);
  }
  get_models_data();
});

const get_models = (data) => {
  const tableBody = document.getElementById("model_table");
  const tableBody2 = document.getElementById("model_table2");
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const dateString = item.last_deployed;
    var last_dep;
    // Convert the date string to a JavaScript Date object
    const date = new Date(dateString);

    // Get the current date
    const currentDate = new Date();

    // Check if the dates are on the same day
    if (date.toDateString() === currentDate.toDateString()) {
      last_dep = "Today";
    } else {
      // Calculate the difference in days
      const differenceInDays = Math.floor(
        (currentDate - date) / (1000 * 60 * 60 * 24)
      );

      // Output the result
      if (differenceInDays === 1) {
        last_dep = "Yesterday";
      } else {
        last_dep = `${differenceInDays} days ago`;
      }
    }
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.service_name}</td>
        <td><div class="state">
        <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="block w-4.5 h-4.5 flex-shrink-0 text-green-700 stroke-[1.8]"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
      
      </div>${item.status}</td>
        <td>${last_dep}</td>
        <td>${item.description || "-"}</td>
      `;

    const row2 = document.createElement("tr");
    row2.innerHTML = `
          <th scope="row">${item.id}</th>
          <td>${item.service_name}</td>
          <td><div class="mb-3">
        <label for="formFile" class="form-label"></label>
        <input class="form-control" type="file" id="formFile${item.id}">
        </div></td>
        <td>
        <button type="button" class="btn btn-success" id=${item.id}>Deploy</button>
        </td>
        `;

    tableBody.appendChild(row);
    tableBody2.appendChild(row2);
    const button = document.getElementById(`${item.id}`);

    button.addEventListener("click",async  () => {
      const uploader = document.getElementById(`formFile${item.id}`);
      try {
        const file = uploader.files[0];
        console.log("file ", file);
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://127.0.0.1:8000/change_model", {
          method: "POST",
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.text().then((data) =>{
          console.log(data);
          const deployment_state = document.getElementById('deployment_state')
          deployment_state.innerText = data
        })
        

      } catch{(e)=> console.log(e)}

    });
  });
};
