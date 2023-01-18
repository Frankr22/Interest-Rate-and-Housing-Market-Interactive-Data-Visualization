document.addEventListener("DOMContentLoaded", function(){
  // Make a GET request to the Flask API endpoint
  fetch('http://127.0.0.1:5000/api/data')
    .then(response => response.json())
    .then(data => {
      // parse the json string
      const parsedData = JSON.parse(data);
      // Get the table body element
      let tbody = document.querySelector('tbody');

      // Clear any existing rows from the table
      tbody.innerHTML = '';

      // Initialize DataTables on the table
      $(document).ready( function () {
        $('#data-table').DataTable({
            "paging":   true,
            "ordering": true,
            "info":     true,
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            "pageLength": 5
        });
      });

      // Iterate through the data and create a new row for each item
      parsedData.forEach(item => {
        let row = document.createElement('tr');
      
        // Create a new cell for each data point
        let date = document.createElement('td');
        let change = document.createElement('td');
        let cashRate = document.createElement('td');
      
        // Set the cell's text content to the data
        date.textContent = new Date(item.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"});
        change.textContent = item.change_pct;
        cashRate.textContent = item.cash_rate_pct;
      
        // Append the cells to the row
        row.appendChild(date);
        row.appendChild(change);
        row.appendChild(cashRate);
      
        // Append the row to the table body
        tbody.appendChild(row);
      });      
    })
    .catch(error => console.error(error));
});
