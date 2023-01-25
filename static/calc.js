function calculateMortgageRepayments() {
  // Get user input
  let mortgageSize = document.getElementById("mortgageSize").value;
  let pastAPR = 2.63;
  let currentAPR = $("#mortgage-data-table tr:last td:last").text();

  //Calculate average monthly mortgage repayments at past APR
  let pastMonthlyPayment = (mortgageSize * (pastAPR / 12) / (1 - (Math.pow(1 / (1 + (pastAPR / 12)), 360))))/30;

  //Calculate average monthly mortgage repayments at latest APR
  let currentMonthlyPayment = (mortgageSize * (currentAPR / 12) / (1 - (Math.pow(1 / (1 + (currentAPR / 12)), 360))))/30;
  
  //Calculate the change in monthly repayments
  let change = currentMonthlyPayment - pastMonthlyPayment;

  // Display the results
  document.getElementById("monthlyRepayments").innerHTML = "Current Monthly Payment: " + currentMonthlyPayment.toFixed(0) + "<br> Past Monthly Payment: " + pastMonthlyPayment.toFixed(0) + "<br> Change in Monthly Payment: " + change.toFixed(0);
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
