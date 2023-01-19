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

// Create the Line Chart Cash Rate vs. Date
// Get the canvas element
var ctx = document.getElementById('line-chart').getContext('2d');

// Define the data for the graph
var data = {
    labels: [], // X-axis labels (dates)
    datasets: [{
        label: 'Cash Rate (%)',
        data: [], // Y-axis data (cash rate)
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
};

// Define the options for the graph
var options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Create the chart
var lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

  // Get data and populate line graph
  // Get the data from the data table
  var tableData = document.querySelectorAll('table tbody tr');

  // Sort the table data by date
  tableData.sort(function(a, b) {
      var dateA = new Date(a.children[0].textContent);
      var dateB = new Date(b.children[0].textContent);
      return dateA - dateB;
  });

  // Extract the date and cash rate data
  [...tableData].sort((a, b) => new Date(a.children[0].textContent) - new Date(b.children[0].textContent)).forEach(function(row) {

    // Add the data to the graph
    data.labels.push(date);
    data.datasets[0].data.push(cashRate);
});

  // Update the chart with the new data
  lineChart.update();
});
});