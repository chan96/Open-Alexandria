var userID;
var dataGlobalUser;
var cookieField = document.cookie.split("; ");

$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  userID = getUrlParameter('userid');
  var userUrl = globalUrl +"getUserInfoFromUID/?userid=" + userID;
    //USERS
    $.get(userUrl, function (data) {
      dataGlobalUser = data;
      //$("#PersonalInfo").html("<thead><tr><th>First Name</th><th>Last Name</th><th>User Email</th><th>Admin Status</th><th>User ID</th></tr></thead>");
      console.log(dataGlobalUser);
      $("#name").html(data.firstname + ' ' + data.lastname);
      $("#type").html(data.isadmin);
      $("#email").html(data.email);
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
