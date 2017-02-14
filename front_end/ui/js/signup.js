
function checkPassword(){
  if(document.getElementById("password").value === document.getElementById("confirm password").value){
    return true;
  }
  else{
    alert("Password does not match.");
    return false;
  }
}
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
  if(document.getElementById("first name").value === "" || document.getElementById("last name").value === "" ||
  document.getElementById("email").value === "" || document.getElementById("number").value === "" ||
  document.getElementById("password").value === "" || document.getElementById("confirm password").value === ""){
    alert("Invalid field");
    return false;
  }
  else if(!validateEmail(document.getElementById("email").value)){
    alert("Invalid email");
    return false;
  }
  else if(!validateNumber(document.getElementById("number").value)){
    alert("Invalid phone number");
    return false;
  }
  else if(!validateLetters(document.getElementById("first name").value) || !validateLetters(document.getElementById("last name").value)){
    alert("Invalid name");
    return false
  }
  else{
    return true;
  }
}

function submitSignUp(form){
  var theUrl = "http://localhost:3000/createNewUser";
  //Need email, password, firstname, and lastname
  //var theUrl = "http://openalexandria.us.to/createNewUser";
  var formData = $(form).serializeArray();
  formData.pop();
  console.log(formData);
  $.post(theUrl, formData, function (data) {
        console.log("SHIT");
        window.location.href = "http://localhost:3000";
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      console.log("DOONE");

    }).fail(function (){
        $("#incorrect").html("<p>Signup Failed</p>");
    });
    return false;
  /*
  var formData = new FormData();
  formData.append('username', document.getElementById("username").value);
  formData.append('password', document.getElementById("password").value);

  console.log(formData);
  */
  /*
  $.ajax({
    method: 'POST',
    url: theUrl,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: { username : document.getElementById("username").value, password : document.getElementById("password").value },
    xhrFields: { withCredentials: true },
    crossDomain: true,
    success: function(data){
      alert("SUCCESS MOFO.");
      console.log(data);
      //var isAdmin=JSON.parse(data).rows[0].users_isadmin;
      //if(isAdmin === true){
      //    window.location = "admin.html";
      //}else{
      //    window.location = "user.html";
      //}
    },
    error: function(error){
      alert("Email and password combination incorrect.");
      console.log(error);
    }
  });
  */
}
/*
$(document).ready(function(){
  $('#submit').click(function(){
    submitLogin();
  });
});
*/
