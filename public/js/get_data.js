
document.addEventListener('DOMContentLoaded',  () => {
    fetchData();
  });
  
  const fetchData = async () => {
    try {
      const response = await fetch('/getalldata');
      if (!response.ok) {
        throw new Error('Failed to fetch data aimen ');
      }
      const data = await response.json();
      data.forEach((coord) => {
        L.marker([coord.lat, coord.long]).addTo(map);
      });
      populateTable(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  const populateTable = async (data) =>  {
    const tableBody = document.getElementById('tableBody');
    data.forEach(item => {
    
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${item.device_id}</th>
        <td>${item.lat}</td>
        <td>${item.long}</td>
        <td>${item.region_name || '-'}</td>
        <td>
          <button type="button" class="btn btn-outline-success">
            Show Data
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  