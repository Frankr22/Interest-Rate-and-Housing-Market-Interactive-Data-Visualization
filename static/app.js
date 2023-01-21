// Add event listener
document.addEventListener("DOMContentLoaded", function(){

  $(document).ready(function() {
      $.ajax({
          type: "GET",
          url: "http://127.0.0.1:5000/rba/data",
          success: function(data) {
              // Parse the JSON string into a JavaScript object
              var jsonData = JSON.parse(data);
              // Initialize the DataTable
              var table = $("#rba-data-table").DataTable({
                  scrollY: "200px",
                  order: [[1, 'desc']],
                  data: jsonData,
                  columns: [
                      { data: "date"},
                      { data: "change_pct" },
                      { data: "cash_rate_pct" }
                  ]

              });
          }
      });
  });

    $(document).ready(function() {
      $.ajax({
          type: "GET",
          url: "http://127.0.0.1:5000/abs/data",
          success: function(data) {
              // Parse the JSON string into a JavaScript object
              var jsonData = JSON.parse(data);
              // Initialize the DataTable
              var table = $("#abs-data-table").DataTable({
                  scrollY: "200px",
                  order: [[1, 'desc']],
                  data: jsonData,
                  columns: [
                      { data: "time_period" },
                      { data: "mean_price" }
                  ]
              });
          }
      });
  });

  // Define the data for the chart
  var data = [{
    x: [], // X-axis labels (dates)
    y: [], // Y-axis data (cash rate)
    type: 'line'
  }];

  // Define the layout for the chart
  var layout = {
    xaxis: {
        type: 'date',
        rangeslider: {
            visible: true
        }
    },
    yaxis: {
        title: 'Cash Rate (%)'
    }
  };

  // Get the data from the table
  var tableData = document.querySelectorAll('table tbody tr');

  // Extract the date and cash rate data
  Array.from(tableData).sort((a, b) => new Date(a.children[0].textContent) - new Date(b.children[0].textContent)).forEach(function(row) {
    var date = new Date(row.children[0].textContent);
    var cashRate = parseFloat(row.children[2].textContent);
    // Add the data to the chart
    data[0].x.push(date);
    data[0].y.push(cashRate);
  });
  // Create the chart
  Plotly.newPlot('line-chart', data, layout);

  // Initialize the map
  var map = L.map('map').setView([-25, 135], 4);

  // Add the tile layer to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Use this link to get the Austalian States GeoJSON data
  let link = "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.min.geojson";

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (state) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.STATE_NAME);

      }
    }).addTo(map);
});
});
