document.addEventListener("DOMContentLoaded", function(){
  // Get RBA data and Create DataTable and Line Chart
  $(document).ready(function() {
      $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/mortgage/data",
        success: function(data) {
            var abs_jsonData = JSON.parse(data);
            // Initialize the DataTable
            var table = $("#mortgage-data-table").DataTable({
              scrollY: "200px",
              data: abs_jsonData,
              order: [[ 0, "desc" ]],
              searching: false,
              columns: [
                  { data: "date" },
                  { data: "mortgage_rate" }
              ]
            });
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
                  { data: "aus_mean_price" },
                  { data: "nsw_mean_price" },
                  { data: "vic_mean_price" },
                  { data: "qld_mean_price" },
                  { data: "sa_mean_price" },
                  { data: "wa_mean_price" },
                  { data: "tas_mean_price" },
                  { data: "nt_mean_price" },
                  { data: "act_mean_price"}
              ]
            });
            // Create Line Chart House Price vs Date
            var trace2 = {
                x: abs_jsonData.map(function(d) { return d.date; }),
                y: abs_jsonData.map(function(d) { return d.aus_mean_price; }),
                mode: 'lines',
                type: 'scatter',
                name: 'Aus House Price',
                yaxis: 'y2'
            };
            var trace3 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.nsw_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'NSW Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace4 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.vic_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'VIC Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace5 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.qld_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'QLD Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace6 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.sa_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'SA Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace7 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.wa_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'WA Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace8 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.tas_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'TAS Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace9 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.nt_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'NT Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var trace10 = {
              x: abs_jsonData.map(function(d) { return d.date; }),
              y: abs_jsonData.map(function(d) { return d.act_mean_price; }),
              mode: 'lines',
              type: 'scatter',
              name: 'ACT Mean Price',
              yaxis: 'y2',
              visible: 'legendonly'
            };
            var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];
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
                            },
                            legend: {
                              x: 1.25,
                              xanchor: 'right',
                              y: 1,
                              yanchor: 'top',
                              bgcolor: 'rgba(255, 255, 255, 0.5)',
                              bordercolor: 'black',
                              borderwidth: 2,
                              margin: {t: 20, r: 20, b: 20, l: 20}
                          }
                          };
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
                  // Get the state name from the GeoJSON data
                  var stateName = feature.properties.STATE_NAME;
                  var statePrice = abs_jsonData[abs_jsonData.length-1][stateToPrice[stateName]]*1000;
                  var price = statePrice ? statePrice.toLocaleString() : "No data available";
                  var latestDate = abs_jsonData[abs_jsonData.length-1].date;
                  var color = chooseColor(stateName);
                  // Set the mouse events to change the map styling.
                  layer.on({
                      mouseover: function(event) {
                          layer = event.target;
                          layer.setStyle({
                              fillOpacity: 0.9
                          });
                      },
                      mouseout: function(event) {
                          layer = event.target;
                          layer.setStyle({
                              fillOpacity: 0.5
                          });
                      },
                      click: function(event) {
                        map.fitBounds(event.target.getBounds());
                        // Use the state name in the map popup
                        event.target.bindPopup("<b>" + stateName + "</b><br>Mean Price ($): " + price + "<br>Date: " + latestDate);
                      },
                  });
                  layer.setStyle({
                    fillColor: color,
                    color: "black",
                    weight: 1,
                    fillOpacity: 0.5
                  });
                }
          }).addTo(map);
        });
      } 
    }); 
  }
});
        }
});
});
}); 
