document.addEventListener("DOMContentLoaded", function(){

  // Get RBA data and Create DataTable and Line Chart
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
                ],
                });
              // Create Line Chart Cash Rate vs Date
              var trace1 = {
                  x: jsonData.map(function(d) { return d.date; }),
                  y: jsonData.map(function(d) { return d.cash_rate_pct; }),
                  mode: 'lines',
                  type: 'scatter',
                  name: 'Cash Rate'
              };
      $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/abs/data",
        success: function(data) {
            var abs_jsonData = JSON.parse(data);
            // Initialize the DataTable
            var table = $("#abs-data-table").DataTable({
              scrollY: "200px",
              data: abs_jsonData,
              order: [[ 0, "desc" ]],
              searching: false,
              columns: [
                  { data: "date" },
                  { data: "mean_price" },
              ]
             });
            // Create Line Chart House Price vs Date
            var trace2 = {
                x: abs_jsonData.map(function(d) { return d.date; }),
                y: abs_jsonData.map(function(d) { return d.aus_mean_price; }),
                mode: 'lines',
                type: 'scatter',
                name: 'House Price',
                yaxis: 'y2'
            };
            var layout = {
                title: 'Cash Rate vs House Price',
                xaxis: {
                    title: 'Date'
                },
                yaxis: {
                    title: 'Cash Rate (%)'
                },
                yaxis2: {
                    title: 'House Price',
                    overlaying: 'y',
                    side: 'right'
                }
            };
            var data = [trace1, trace2];
            Plotly.newPlot('line-chart', data, layout); 
          }
        });
      },
  }); 

//  // Initialize the map
//  var map = L.map('map').setView([-25, 135], 4);

//  // Add the tile layer to the map
//  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//  }).addTo(map);

//  // Use this link to get the Austalian States GeoJSON data
//  let link = "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.min.geojson";

//  // Getting our GeoJSON data
//  d3.json(link).then(function(data) {
//    // Creating a GeoJSON layer with the retrieved data
//    L.geoJson(data, {
//      // This is called on each feature.
//      onEachFeature: function(feature, layer) {
//        // Set the mouse events to change the map styling.
//        layer.on({
//          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out
//          mouseover: function(event) {
//            layer = event.target;
//            layer.setStyle({
//              fillOpacity: 0.9
//            });
//          },
//          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%.
//          mouseout: function(event) {
//            layer = event.target;
//            layer.setStyle({
//              fillOpacity: 0.5
//            });
//          },
//          // When a feature (state) is clicked, it is enlarged to fit the screen
//          click: function(event) {
//            map.fitBounds(event.target.getBounds());
//            var state = event.target.feature.properties.STATE_NAME;
//            var stateData = abs_jsonData.filter(function(d) {return d[state.slice(0,2).toLowerCase()+'_mean_price']});
//            table.clear();
//            table.rows.add(stateData[0][stateToPrice[state]]);
//            table.draw();
//          }
//        });
//        // Giving each feature a pop-up with information pertinent to it
//        layer.bindPopup("<h3>" + feature.properties.STATE_NAME + "</h3> <br> <h4> Mean Price: </h4>" + abs_jsonData[0][stateToPrice[feature.properties.STATE_NAME]]);
//      },
//      style: {
//        color: "white",
//        // Call the chooseColor function to decide which color to color our neighborhood (colour based on state)
//        fillColor: function(feature) {
//          return chooseColor(feature.properties.STATE_NAME);
//        },
//        fillOpacity: 0.5,
//        weight: 1.5
//      }
//    }).addTo(map);
//  });

//   $(document).on("click", ".leaflet-interactive", function() {
//   var state = $(this).find("h3").text();
//   if (state in abs_jsonData) {
//   var stateData = abs_jsonData.map(function(d) {
//       return {
//         date: d.date,
//         mean_price: d[state.toLowerCase().slice(0,2)+"_mean_price"]
//       }
//     });
//     $("#abs-data-table").DataTable().clear();
//     $("#abs-data-table").DataTable().rows.add(stateData).draw();
//   }
//   });
  });
});
