var dataGlobalUser;

function submitChange(form){
  var theUrl = globalUrl + "editUserInfo";
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  $.post(theUrl, formData, function (data) {
        //redirect to appropriate page
        redirect();
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
        $("#incorrect").html("<p>Changes failed to save</p>");
    });
    return false;
}

$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  var userUrl = globalUrl +"getUserInfo";
    //USERS
    $.get(userUrl, function (data) {
      dataGlobalUser = data;
      //$("#PersonalInfo").html("<thead><tr><th>First Name</th><th>Last Name</th><th>User Email</th><th>Admin Status</th><th>User ID</th></tr></thead>");
      console.log(dataGlobalUser);
      document.getElementById("firstname").value = data.firstname;
      document.getElementById("lastname").value = data.lastname;
      document.getElementById("email").value = data.email;
      /*
      $("#firstname").html(data.firstname);
      $("#lastname").html(data.lastname);
      $("#email").html(data.email);
      */
      /*
      for(var count = 0; count < Object.keys(dataGlobalUser.suggestions).length; count++){
        var buttonText = "";
        if(data.suggestions[count].data.users_isactive){
          buttonText = "Block User";
        }else{
          buttonText = "Unblock User";
        }
        $("#PersonalInfo").append("<tbody><tr><td>" + data.suggestions[count].data.users_firstname + "</td><td>" + data.suggestions[count].data.users_lastname + 
          "</td><td>"+ data.suggestions[count].data.users_email +"</td><td>"+ data.suggestions[count].data.users_isadmin +
          "</td><td>" + data.suggestions[count].data.users_unique_id + 
          "<td><button id='block" + count + "' type='button' onclick='blockUser(" + count + ")'>" + buttonText + "</button></td></tr></tbody>");
      }
      */
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
      console.log("fail");
    });
});