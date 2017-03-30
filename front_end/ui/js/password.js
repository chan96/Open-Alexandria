var dataGlobalUser;
var cookieField = document.cookie.split("; ");

function submitChange(form){
  if(document.getElementById("newPassword").value == document.getElementById("confirmPassword").value){
    var theUrl = globalUrl + "editUserPassword";
    //var theUrl = "http://openalexandria.us.to/loginUser";
    var formData = $(form).serializeArray();
    console.log(formData);
    console.log(theUrl);
    $.post(theUrl, formData, function (data) {
        console.log("Password information changed!");
        $("#log").html("<p color='black'>Password information changed!</p>");
      }).fail(function (){
          $("#log").html("<p>Old password incorrect</p>");
      }); 
      return false;
    }
    else{
      $("#log").html("<p>Password did not match.</p>");
      return false;
    }
}