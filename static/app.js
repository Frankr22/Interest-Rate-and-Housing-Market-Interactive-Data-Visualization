document.addEventListener("DOMContentLoaded", function(){

  // Make a GET request to the Flask API endpoint
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      // Get the table body element
      let tbody = document.querySelector('tbody');

      // Clear any existing rows from the table
      tbody.innerHTML = '';

      // Iterate through the data and create a new row for each item
      data.forEach(item => {
        let row = document.createElement('tr');

        // Create a new cell for each data point
        let date = document.createElement('td');
        let change = document.createElement('td');
        let cashRate = document.createElement('td');

        // Set the cell's text content to the data
        date.textContent = item.date;
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