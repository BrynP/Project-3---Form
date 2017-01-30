var Total;
var ValidationMessage;
var valid;
//Do all this when the page loads
$(document).ready(function(){
  //Focus to the "Name" field
    $("#name").focus();

    //Hide the "job" role, this will show if the user makes the "other" selection
    $("#job_role").hide();

    //Hide the T Shirt Colors, these will be shown when the user picks a theme first.
    $(".jsSelection").hide();
    $(".jsPunsSelection").hide();
    //Hide the "Color" selection box altogether, this will only show when a theme is picked
    $("#colors-js-puns").hide();

    Total = 0;
    $(".totalcost").html("Total: $" + Total);
    HidePayment();

});

//This function will be called on the "onchange" attribute of the title selector.
//I have used 2 ways of doing onChange to play with them both.
//For this method, I am having the HTML code call the function when the user makes a selection.
//This function will check to see if the current selection in the drop down menu is
//"other", if so, it'll fade in the "job role" input box.
//If they select anything that isn't "other" then the box will fade out.
function getSel(sel)
{
    if (sel.value == "other")
    {

      $("#job_role").fadeIn(100);
    }

    if(sel.value != "other")
    {
      $("#job_role").fadeOut(100);
    }

}


//For the T-Shirt designs. I took a different approach to detecting change.
//Instead, the JQuery script will check to see if the user makes a change and react to it

//This will check the "design" drop down box.
//If any changes are made:
//It'll check to see if the user has pick "I ♥ JS" and if they have, it'll show all
//Corresponding colors and hide the prompt telling them to make a theme selection
//and remove any invalid colors.

//Then it'll do the same if the user picks "JS Puns", just for the Corresponding
//Colors for this design.

//Then it'll check to see if the user has selected the "placeholder" item, which says "Select Theme"
//This will have a value of "selector" to just indicate that it is prompting the user to make a selection.
//And it will identify when the hide all colors and make a prompt in the "Color" drop down box for the user to make a choice

//However, this functionality was changed with the extra credit in mind. So if the placeholder called "selector" is selected
//It'll hide the color label and box until a theme is selected. The final if statement is to test is anything other than the
//placeholder "selector" is selected, so it shows the "color" label and box.
$("#design").change(function() {


  if (this.value == "heart js")
  {

    $("#colorSelector").hide();
    $("#color option[value='tomato']").prop("selected", true);
    $(".jsSelection").show();
    $(".jsPunsSelection").hide();

  }

  if (this.value == "js puns")
  {

    $("#colorSelector").hide();
    $("#color option[value='cornflowerblue']").prop("selected", true);
    $(".jsSelection").hide();
    $(".jsPunsSelection").show();

  }

  if (this.value == "selector")
  {

    $("#colorSelector").show();
    $(".jsSelection").hide();
    $(".jsPunsSelection").hide();
    $("#colors-js-puns").hide();
  }

  if (this.value != "selector")
  {
    $("#colors-js-puns").show();
  }
});



//Call this whenever an input changes within the activities class
$(".activities input").change(function() {

//I am storing the appointments that clash
    var Tues9_12 = $(".activities label:contains('Tuesday 9am-12pm') input");
    var Tues9_12checked = $(".activities label:contains('Tuesday 9am-12pm') input:checked");

    var Tues1_4 = $(".activities label:contains('Tuesday 1pm-4pm') input");
    var Tues1_4checked = $(".activities label:contains('Tuesday 1pm-4pm') input:checked");
    //Tuesday 1pm-4pm,

//Use the "checkAppointment" function to grey out any that clash
    checkAppointment(Tues9_12, Tues9_12checked);
    checkAppointment(Tues1_4, Tues1_4checked);


    //As a second point for doing the check boxes
    //Store all of the prices
    var MainConferencePrice = parseInt($(".activities input[name='all']").parent().text().split("$").pop());
    var js_frameworks = parseInt($(".activities input[name='js-frameworks']").parent().text().split("$").pop());
    var js_libs = parseInt($(".activities input[name='js-libs']").parent().text().split("$").pop());
    var express = parseInt($(".activities input[name='express']").parent().text().split("$").pop());
    var node = parseInt($(".activities input[name='node']").parent().text().split("$").pop());
    var build_tools = parseInt($(".activities input[name='build-tools']").parent().text().split("$").pop());
    var npm = parseInt($(".activities input[name='npm']").parent().text().split("$").pop());

    //Set the "total" price to "0" first, so should none be selected, it will show '0'
    Total = 0;

    //Check which checkboxes are checked and add the price to the total for each
    if ($("input[name='all']").prop("checked"))
        Total += MainConferencePrice;
    if ($("input[name='js-frameworks']").prop("checked"))
        Total += js_frameworks;
    if ($("input[name='js-libs']").prop("checked"))
        Total += js_libs;
    if ($("input[name='express']").prop("checked"))
        Total += express;
    if ($("input[name='node']").prop("checked"))
        Total += node;
    if ($("input[name='build-tools']").prop("checked"))
        Total += build_tools;

    if ($("input[name='npm']").prop("checked"))
          Total += npm;




    //Display the "Total" cost at the bottom of the Activities section
    $(".totalcost").html("Total: $" + Total);


});

//If the user changes their payment option
$("#payment").change(function(){
  //Hide all payment options by default
  HidePayment();
  //Then show the corresponding option based on selection
  if (this.value == "credit card")
    $("#credit-card").show();
  if (this.value == "bitcoin")
    $("#bitcoin").show();
  if (this.value == "paypal")
    $("#paypal").show();

});

//When the user focuses out of the "Name" field, it will check whether a name has been entered or not
//And show an error if it's empty
$("#name").focusout(function(){
  if ($("#name").val() == "")
  {
    $("#name_error").html("*Please Enter a Name*");
  }
  else
  {
    $("#name_error").html("");
  }

});


//Function to hide all payment options from the form
function HidePayment() {
  $("#bitcoin").hide();
  $("#credit-card").hide();
  $("#paypal").hide();
}


//Function for greying out any clashes in the appointments
function checkAppointment( input, checked){


    //Disable the input by default
    input.prop("disabled", true);
    //And put a strike through it
    input.parent().css("text-decoration", "line-through");

    //Then enable it if it's checked
    checked.prop("disabled", false);

    //And restore the CSS
    checked.parent().css("text-decoration", "initial");

    if (checked.parent().length < 1)
    {
        input.prop("disabled", false);
        input.parent().css("text-decoration", "initial");
    }
}


//Function for testing whether the form is valid on submit
function Validate() {

    //It will return true or false if valid or not.
    //The default will be "true". so if no errors are found, you can submit the form
    valid = true;
    //This will show a message to tell the user they've manage an error. Any errors will be
    //appended to this
    ValidationMessage = "<h4>You Cannot Submit this Form Because of the Following:</h4>";


    //For checking each form element that's required
    //Add an error message to the list if it's empty or not got a valid selection
    //And set valid to "false" so the form doesn't submit
    if ($("#name").val() == "")
    {
      ValidationMessage += "<li>You haven't given your Name</li>";
      valid = false;
    }

    if ($("#mail").val() == "")
    {
      ValidationMessage += "<li>You haven't given your Email address</li>";
      valid = false;
    }

    if ($("#mail").val() != "")
    {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( re.test($("#mail").val()) ) {
          // this is a valid email address
          // call setState({email: email}) to update the email
          // or update the data in redux store.
      }
      else {
          ValidationMessage += "<li>Please use a Valid Email Address</li>";
          valid = true;
      }
    }


    if ($("#design").val() == "selector")
    {
      ValidationMessage += "<li>You haven't picked a T-Shirt theme</li>";
      valid = false;
    }

    if (!$("input[type='checkbox']").prop("checked"))
    {
      ValidationMessage += "<li>You haven't registered for an activity</li>";
      valid = false;
    }

    if ($("#payment").val() == "select_method")
    {
      ValidationMessage += "<li>You haven't selected your payment method</li>";
      valid = false;
    }

    if ($("#payment").val() == "credit card")
    {

      if($("#cc-num").val()=="")
      {
        ValidationMessage += "<li>Please provide a credit card number</li>";
        valid = false;
      }

      if($("#zip").val()=="")
      {
        ValidationMessage += "<li>Please Enter your ZIP Code</li>";
        valid = false;
      }



      if($("#cvv").val()=="")
      {
        ValidationMessage += "<li>Please Enter your CVV Code</li>";
        valid = false;
      }
    }
    //Show the error messages
    $("#validation_message").html(ValidationMessage);

    return valid;
}
