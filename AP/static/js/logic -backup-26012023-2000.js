console.log('Anshuman: This is JS code getting executed!');
//Declaring all global variables
var wa_res_dwelling_mean = {};
var act_res_dwelling_mean = {};
var tas_res_dwelling_mean = {};
var vic_res_dwelling_mean = {};
var aust_res_dwelling_mean = {};
var nsw_res_dwelling_mean = {};
var nt_res_dwelling_mean = {};
var qld_res_dwelling_mean = {};
var sa_res_dwelling_mean = {};

var check_box_selected =[]; //This variable stores all the selected check box
//Declaring array list for x and y asis 
var x_axis_wa =[];
var y_axis_wa =[];
var x_axis_act = [];
var y_axis_act =[];
var x_axis_tas =[];
var y_axis_tas =[];
var x_axis_vic =[];
var y_axis_vic =[];
var x_axis_nsw =[];
var y_axis_nsw =[];
var x_axis_nt =[];
var y_axis_nt =[];
var x_axis_qld =[];
var y_axis_qld =[];
var x_axis_sa =[];
var y_axis_sa =[];


/*Logic to SelectAll check box */
function selectAll() {
  var checkboxes = document.getElementsByClassName("checkbox");
  var selectAll = document.getElementById("select-all");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAll.checked;
  }
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
     
     //Segregating data into different variables region wise 
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

function printPlotly() {
  var items = document.getElementsByName("acs");
  var selectedItems = "";
  for (var i = 0; i < items.length; i++) {
     // if (items[i].type == "checkbox" && items[i].checked == true) selectedItems += items[i].value + "\n";

     if (items[i].type == "checkbox" && items[i].checked == true)  check_box_selected.push(items[i].value);
      
  }
  //console.log(selectedItems);
  //console.log(check_box_selected);
  //Creating x and y axis based on value selected 
   for (let i = 0; i < check_box_selected.length; i++) {
    console.log(check_box_selected[i]);
   
    if (check_box_selected[i]== "WA") {
      //Creating x and y axis 
      Object.entries(wa_res_dwelling_mean).forEach(([key, value]) => {
        //console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_wa.push(value.time_period);
        y_axis_wa.push(value.mean_price);
        });

      var trace1 = {
                    x: x_axis_wa,
                    y: y_axis_wa,
                    mode: 'lines',
                    type: 'scatter'
                    //name: 'Aus House Mean Price'
                    //yaxis: 'y2'
                    };

    } else if (check_box_selected[i]== "ACT"){
      //Creating x and y axis 
      Object.entries(act_res_dwelling_mean).forEach(([key, value]) => {
        //console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_act.push(value.time_period);
        y_axis_act.push(value.mean_price);
        });
        var trace2 = {
                      x: x_axis_act,
                      y: y_axis_act,
                      mode: 'lines',
                      type: 'scatter'
                      //name: 'Aus House Mean Price'
                      //yaxis: 'y2'
                      };


    } else if (check_box_selected[i]== "TAS"){
      //Creating x and y axis 
      Object.entries(tas_res_dwelling_mean).forEach(([key, value]) => {
       // console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_tas.push(value.time_period);
        y_axis_tas.push(value.mean_price);
        });
        var trace3 = {
                  x: x_axis_tas,
                  y: y_axis_tas,
                  mode: 'lines',
                  type: 'scatter'
                  //name: 'Aus House Mean Price'
                  //yaxis: 'y2'
                  };


    } else if (check_box_selected[i]== "VIC"){
      //Creating x and y axis 
      Object.entries(vic_res_dwelling_mean).forEach(([key, value]) => {
        //console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_vic.push(value.time_period);
        y_axis_vic.push(value.mean_price);
        });
        var trace4 = {
                      x: x_axis_vic,
                      y: y_axis_vic,
                      mode: 'lines',
                      type: 'scatter'
                      //name: 'Aus House Mean Price'
                      //yaxis: 'y2'
                      };

    } else if (check_box_selected[i]== "NSW"){
      //Creating x and y axis 
      Object.entries(nsw_res_dwelling_mean).forEach(([key, value]) => {
       // console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_nsw.push(value.time_period);
        y_axis_nsw.push(value.mean_price);
        });

        var trace5 = {
                    x: x_axis_nsw,
                    y: y_axis_nsw,
                    mode: 'lines',
                    type: 'scatter'
                    //name: 'Aus House Mean Price'
                    //yaxis: 'y2'
                    };


    } else if (check_box_selected[i]== "NT"){
      //Creating x and y axis 
      Object.entries(nt_res_dwelling_mean).forEach(([key, value]) => {
       // console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_nt.push(value.time_period);
        y_axis_nt.push(value.mean_price);
        });
        var trace6 = {
                  x: x_axis_nt,
                  y: y_axis_nt,
                  mode: 'lines',
                  type: 'scatter'
                  //name: 'Aus House Mean Price'
                  //yaxis: 'y2'
                  };


    } else if (check_box_selected[i]== "QLD"){
      //Creating x and y axis 
      Object.entries(qld_res_dwelling_mean).forEach(([key, value]) => {
       // console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_qld.push(value.time_period);
        y_axis_qld.push(value.mean_price);
        });
        var trace7 = {
                  x: x_axis_qld,
                  y: y_axis_qld,
                  mode: 'lines',
                  type: 'scatter'
                  //name: 'Aus House Mean Price'
                  //yaxis: 'y2'
                  };

    } else if (check_box_selected[i]== "SA"){
      //Creating x and y axis 
      Object.entries(sa_res_dwelling_mean).forEach(([key, value]) => {
        //console.log(key + ": " + value.time_period+" : "+ value.mean_price ) ;
        x_axis_sa.push(value.time_period);
        y_axis_sa.push(value.mean_price);
        });

        var trace8 = {
                      x: x_axis_sa,
                      y: y_axis_sa,
                      mode: 'lines',
                      type: 'scatter'
                      //name: 'Aus House Mean Price'
                      //yaxis: 'y2'
                      };


    } else {
      console.error(error)
      console.log(`Error occured while creating plotly line chart`)
    };
    
   }; //end of for loop



//var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];
var data = [trace1];

var layout = {
      yaxis: {range: [300, 1200], title: "Price in Thousands"},
      //xaxis: {range: [300, 1200], title: "Mean price in thousands"},
      //yaxis: {range: [5, 16], title: "Price in Millions"},
      title: "Residentail Dwelling Mean Price",
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      }
    
      };


Plotly.newPlot('line-chart', data, layout);


}; //end of  printPlotly function


  