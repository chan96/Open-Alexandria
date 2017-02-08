function submitLogin(form){
  var theUrl = "http://openalexandria.us.to:3000/loginUser";
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  console.log("FUCK");
  $.post(theUrl, formData, function (data) {
        console.log("SHIT");
        window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      console.log("DOONE");

    }).fail(function (){
        console.log("ass");
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
