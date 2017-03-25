function submitLogin(form){
  var theUrl = globalUrl + "loginUser";
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  $.post(theUrl, formData, function (data) {
        //redirect to appropriate page
        redirect();
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
        $("#incorrect").html("<p>Login Incorrect</p>");
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
function redirect() {
  var redirectUrl = getRedirectParameter(location.href);
  console.log(redirectUrl.length);
  var cookieField = document.cookie.split("; ");

  if (redirectUrl != '') {
      window.location.href = redirectUrl;
      console.log('hi');
  } 
  else if(cookieField[2]="isadmin=true"){
    window.location.href = globalUrl + "admin.html";
  }
  else {
      window.location.href = globalUrl;
  }

}

var getRedirectParameter = function getRedirectParameter(fullUrl) {
  var redirectParam = '';

  try {
    redirectParam = fullUrl.split('redirect')[1].replace('=', '');
  } catch (err) {
    return '';
  }


  return redirectParam;
};
