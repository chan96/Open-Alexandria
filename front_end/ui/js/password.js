var dataGlobalUser;
var cookieField = document.cookie.split("; ");

function submitChange(form){
  var theUrl = globalUrl + "editUserPassword";
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  console.log(formData);
  $.post(theUrl , formData, function (data) {
      console.log("Password information changed!");
      $("#log").html("<p color='black'>Password information changed!</p>");
    }).done(function(){
      //document.cookie;

    }).fail(function (){
        $("#log").html("<p>Changes failed to save</p>");
    });
    return false;
}