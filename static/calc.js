function calculateMortgageRepayments() {
      // Get user input
      let mortgageSize = document.getElementById("mortgageSize").value;
      let currentAPR = document.getElementById("currentAPR").value;
      let futureAPR = document.getElementById("futureAPR").value;
  
      //Calculate average monthly mortgage repayments at current APR
      let currentMonthlyPayment = mortgageSize * (currentAPR / 12) / (1 - (Math.pow(1 / (1 + (currentAPR / 12)), 360)));
  
      //Calculate average monthly mortgage repayments at future APR
      let futureMonthlyPayment = mortgageSize * (futureAPR / 12) / (1 - (Math.pow(1 / (1 + (futureAPR / 12)), 360)));
  
      // Display the results
      document.getElementById("repayments").innerHTML = "Current Monthly Payment: " + currentMonthlyPayment.toFixed(2) + "<br>Future Monthly Payment: " + futureMonthlyPayment.toFixed(2);
};

var stateToPrice = {
  "New South Wales": "nsw_mean_price",
  "Victoria": "vic_mean_price",
  "Queensland": "qld_mean_price",
  "South Australia": "sa_mean_price",
  "Western Australia": "wa_mean_price",
  "Tasmania": "tas_mean_price",
  "Northern Territory": "nt_mean_price",
  "Australian Capital Territory": "act_mean_price"
};

function chooseColor(state) {
  switch (state) {
  case "New South Wales":
  return "yellow";
  case "Victoria":
  return "red";
  case "Queensland":
  return "orange";
  case "South Australia":
  return "green";
  case "Western Australia":
  return "purple";
  case "Tasmania":
  return "blue";
  case "Northern Territory":
  return "pink";
  case "Australian Capital Territory":
  return "black";
  default:
  return "white";
  }
};