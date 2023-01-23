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
                  data: jsonData,
                  order: [[ 0, "desc" ]],
                  searching: false,
                  columns: [
                      { data: "date"},
                      { data: "change_pct" },
                      { data: "cash_rate_pct" },
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
                  data: jsonData,
                  order: [[ 0, "desc" ]],
                  searching: false,
                  columns: [
                      { data: "time_period" },
                      { data: "mean_price" },
                  ]
              });
          }
      });
  });

    // // Get the data from both tables
    // var rbaTableData = document.querySelectorAll('#rba-data-table tbody tr');
    // var absTableData = document.querySelectorAll('#abs-data-table tbody tr');

    // // Extract the date and cash rate data
    // Array.from(rbaTableData).sort((a, b) => new Date(a.children[0].textContent) - new Date(b.children[0].textContent)).forEach(function(row) {
    //   var date = new Date(row.children[0].textContent);
    //   var cashRate = parseFloat(row.children[2].textContent);
    //   // Add the cash rate data to the chart
    //   data[0].x.push(date);
    //   data[0].y.push(cashRate);
    // });
    
    // // Extract the date and house price data
    // Array.from(absTableData).sort((a, b) => new Date(a.children[0].textContent) - new Date(b.children[0].textContent)).forEach(function(row) {
    //   var date = new Date(row.children[0].textContent);
    //   var housePrice = parseFloat(row.children[1].textContent);
    //  // Add the data to the chart
    //   data.push({
    //   x: [date],
    //   y: [housePrice],
    //   type: 'line',
    //   name: 'House Price'
    // });

    // // Define the chart layout
    // var layout = {
    //   xaxis: {
    //       type: 'date',
    //       rangeslider: {
    //           visible: true
    //       }
    //   },
    //   yaxis: {
    //       title: 'Cash Rate (%)'
    //   },
    //   yaxis2: {
    //     title: 'House Price (AUD)',
    //     overlaying: 'y',
    //     side: 'right',
    //     showgrid: false
    //   },
    // };

    // Create the chart
    // Plotly.newPlot('line-chart', data, layout);

  // Initialize the map
  var map = L.map('map').setView([-25, 135], 5);

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