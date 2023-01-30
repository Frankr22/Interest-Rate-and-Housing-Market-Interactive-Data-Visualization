function doSomething(id) {
  var value = document.getElementById(id).value;
  console.log(value);
  //...
}



/****************************************/
/*Logic to catch the check box checked event and print the value*/
      //Logic to create data based on check box checked 
      var checkbox = document.querySelectorAll("#checkboxNSW, #checkboxVIC, #checkboxQLD, #checkboxSA,#checkboxWA,#checkboxACT,#checkboxNT,#checkboxTAS");
      // Get the checkbox element
      // var checkbox = document.getElementById("myCheckbox");

      //Loop through the array elements and attach the event
      for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener("change", checkedOrNot);
        if (checkbox.value==='WA') {
          console.log('WA Selected');
        }
      }
      
      function checkedOrNot() {
        var isChecked = this.checked;    
        if (isChecked) { //checked
          console.log('checked');
          console.log(checkbox.value);
        
        } else { //unchecked
          console.log('unchecked');
          console.log(checkbox.value);
        }
      }

/***************************************/