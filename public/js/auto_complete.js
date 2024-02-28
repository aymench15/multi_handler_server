const load_data = async (query = "") => {
  try {
    const response = await fetch("/autocomplete", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData)
    // var html = '<ul class="list-group">';

    // if (responseData.response.length > 0 && query != '') {
    //   for (var count = 0; count < responseData.response.length; count++) {
    //     var regular_expression = new RegExp('(' + query + ')', 'gi');
    //     html += '<a href="#" class="list-group-item list-group-item-action" onclick="get_text(this)">' + responseData.response[count].replace(regular_expression, '<span class="text-primary fw-bold">$1</span>') + '</a>';
    //   }
    // } else {
    //   html += '<a href="#" class="list-group-item list-group-item-action disabled">No Data Found</a>';
    // }

    // html += '</ul>';
    
    populateTable(responseData);
    handleButtonClick(Buttons.staticProperty)
    Buttons.forecast_data = get_forecast_data(Buttons.staticProperty)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

var search_element = document.getElementById("autocomplete_search");

search_element.addEventListener("keyup",  () => {
  var query = search_element.value;
  console.log(query);
  load_data(query);
});

search_element.addEventListener("focus",  () => {
  var query = search_element.value;
  console.log(query);
  load_data(query);
});
