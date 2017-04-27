var dataGlobalUser;
var cookieField = document.cookie.split("; ");

function submitChange(form){
  if(checkAllInputs()){
    var theUrl = globalUrl + "editUserInfo";
    //var theUrl = "http://openalexandria.us.to/loginUser";
    var formData = $(form).serializeArray();
    console.log(formData);
    $.post(theUrl, formData, function (data) {
      console.log("Profile information changed!");
      $("#log").html("<p color='black'>Profile information changed!</p>");
    }).done(function(){
      //document.cookie;

    }).fail(function (){
      $("#log").html("<p>Changes failed to save</p>");
    });
    return false;
  }
  return false;
}

$(document).ready(function(){
  var userUrl = globalUrl +"getUserInfo";
  $.get(userUrl, function (data) {
    dataGlobalUser = data;
    console.log(dataGlobalUser);
    document.getElementById("firstname").value = data.firstname;
    document.getElementById("lastname").value = data.lastname;
    document.getElementById("email").value = data.email;
  }).done(function(){
  }).fail(function (){
    console.log("fail");
  });
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validateNumber(number) {
  return /^[0-9]+$/.test(number);
}
function validateLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function checkAllInputs(){

  if(!validateEmail(document.getElementById("email").value)){
    alert("Invalid email");
    return false;
  }
  else if(!validateLetters(document.getElementById("firstname").value) || !validateLetters(document.getElementById("lastname").value)){
    alert("Invalid name");
    return false
  }
  else{
    return true;
  }
}
