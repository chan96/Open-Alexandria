var dataGlobalUser;
var cookieField = document.cookie.split("; ");

function submitChange(form){
  var theUrl = globalUrl + "editUserPassword";
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  console.log(formData);
  $.post(theUrl , formData, function (data) {
      console.log("Profile information changed!");
    }).done(function(){
      //document.cookie;

    }).fail(function (){
        $("#incorrect").html("<p>Changes failed to save</p>");
    });
    return false;
}