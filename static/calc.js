function calculateMortgageRepayments() {
  // Get user input
  let mortgageSize = document.getElementById("mortgageSize").value;
  let termMonths = 360;
  let pastAPR = 2.63;
  let pastAPRPerMonth = pastAPR / 1200;
  let currentAPR = 4.36;
  let currentAPRPerMonth = currentAPR / 1200;

  //Calculate average monthly mortgage repayments at past APR
  let pastMonthlyPayment = mortgageSize * (pastAPRPerMonth * (Math.pow(1 + pastAPRPerMonth, termMonths))) / (Math.pow(1 + pastAPRPerMonth, termMonths) - 1);

  //Calculate average monthly mortgage repayments at latest APR
  let currentMonthlyPayment = mortgageSize * (currentAPRPerMonth * (Math.pow(1 + currentAPRPerMonth, termMonths))) / (Math.pow(1 + currentAPRPerMonth, termMonths) - 1);
  
  //Calculate the change in monthly repayments
  let change = currentMonthlyPayment - pastMonthlyPayment;

  // Display the results
  document.getElementById("monthlyRepayments").innerHTML = "Current Monthly Payment: $" + currentMonthlyPayment.toFixed(2) + "<br> Past Monthly Payment: $" + pastMonthlyPayment.toFixed(2) + "<br> Change in Monthly Payment: $" + change.toFixed(2);
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
