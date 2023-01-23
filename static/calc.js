$(document).ready(function(){
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
    }
  });
  