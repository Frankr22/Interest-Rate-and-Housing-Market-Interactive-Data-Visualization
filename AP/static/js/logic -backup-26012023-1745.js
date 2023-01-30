console.log('Anshuman: This is JS code getting executed!');
//Declaring all global variables

/*Logic to SelectAll check box */
function selectAll() {
  var checkboxes = document.getElementsByClassName("checkbox");
  var selectAll = document.getElementById("select-all");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAll.checked;
  }
}

//Test function 
function doSomething(id) {
  var value = document.getElementById(id).value;
  console.log(`sssss ${value}`);
  //...
}

/*--In order to fetch data from an endpoint in JavaScript, you can 
  --use the fetch() function or an HTTP client library such as Axios or jQuery. 
*/

/* Fetching data from the endpoint using fetch() function*/

fetch('http://127.0.0.1:5000//resdwelling/mean')
  .then(response => response.json())
  .then(data => {
    // Do something with the data
    // console.log(data);
    // Parse the JSON string into a JavaScript object
     var jsonData = JSON.parse(data);
     //console.log(jsonData.id);
     
     var wa_res_dwelling_mean = {};
     var act_res_dwelling_mean = {};
     var tas_res_dwelling_mean = {};
     var vic_res_dwelling_mean = {};
     var aust_res_dwelling_mean = {};
     var nsw_res_dwelling_mean = {};
     var nt_res_dwelling_mean = {};
     var qld_res_dwelling_mean = {};
     var sa_res_dwelling_mean = {};

     Object.keys(jsonData).forEach(function(key) {
       if (jsonData[key]["region"] === "WA") {
        wa_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "ACT") {
        act_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "TAS") {
        tas_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "VIC") {
        vic_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "AUST") {
        aust_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "NSW") {
        nsw_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "NT") {
        nt_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "QLD") {
        qld_res_dwelling_mean[key] = jsonData[key];
       }

       if (jsonData[key]["region"] === "SA") {
        sa_res_dwelling_mean[key] = jsonData[key];
       }

     });
     
     //console.log(`${wa_res_dwelling_mean.time_perid}`); 
     let x_axis_wa =[]
     let y_axis_wa =[]
     //Testing code to print the value inside a object
      Object.entries(wa_res_dwelling_mean).forEach(([key, value]) => {
      console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
      x_axis_wa.push(value.time_period);
      y_axis_wa.push(value.mean_price);
      });
     
      //console.log(x_axis_wa);
      //console.log(y_axis_wa);
     var trace1 = {
                    x: x_axis_wa,
                    y: y_axis_wa,
                    mode: 'lines',
                    type: 'scatter'
                    //name: 'Aus House Mean Price'
                    //yaxis: 'y2'
                  };

     //var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];
     var data = [trace1];

     var layout = {
                  yaxis: {range: [300, 1200], title: "Price in Thousands"},
                  //xaxis: {range: [300, 1200], title: "Mean price in thousands"},
                  //yaxis: {range: [5, 16], title: "Price in Millions"},
                  title: "Residentail Dwelling Mean Price"
                  };
     

     Plotly.newPlot('line-chart', data, layout);
    

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
 
  

  /* Fetching data from the endpoint using axios library*/
  /*
  axios.get('http://127.0.0.1:5000//resdwelling/mean')
  .then(response => {
    // Do something with the data
    //console.log(response.data);
    let resdwelling_mean=response.data;
    console.log(resdwelling_mean.region);
    
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
*/