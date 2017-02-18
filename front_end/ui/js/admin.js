var dataGlobalCourse;
var dataGlobalUser;
var dataGlobalQuestion = [];

  var questionUrl;

$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";

  var courseUrl = globalUrl + "getAllCourse";
  var userUrl = globalUrl +"listAllUsers";
  questionUrl = globalUrl + "getAllQuestions?uniqueid=";

  	//COURSE
  	$.get(courseUrl, function (data) {
      dataGlobalCourse = data;
      $("#courseTable").html("<thead><tr><th>Course Description</th><th>Course Name</th><th>Course Members</th><th>Course ID</th></tr></thead>");

      for(var count = 0; count < Object.keys(dataGlobalCourse.suggestions).length; count++){
        var buttonText = "";
        if(data.suggestions[count].data.courses_isactive){
          buttonText = "Disable Course";
        }else{
          buttonText = "Enable Course";
        }
        $("#courseTable").append("<tbody id='courseBodyTable" + count + "'><tr id='courseBodyRow"+ count + "'><td>" + data.suggestions[count].data.courses_description + "</td><td>" + data.suggestions[count].data.courses_name + 
          "</td><td>"+ data.suggestions[count].data.courses_nummember +"</td><td>"+ data.suggestions[count].data.courses_unique_id +
          "</td><td><button id='enableDisable" + count + "' type='button' onclick='enableDisableCourse(" + count + ")'>" + buttonText + "</button></td><td>"
          +"<button id='listQ" + count + "' type='button' onclick='listQuestions(" + count + ")'>List All Questions</button></td></tr></tbody>");
      }
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

  	}).fail(function (){
  		console.log("fail");
  	});
    //USERS
    $.get(userUrl, function (data) {
      dataGlobalUser = data;
      $("#userTable").html("<thead><tr><th>First Name</th><th>Last Name</th><th>User Email</th><th>Admin Status</th><th>User ID</th></tr></thead>");
      for(var count = 0; count < Object.keys(dataGlobalUser.suggestions).length; count++){
        var buttonText = "";
        if(data.suggestions[count].data.users_isactive){
          buttonText = "Block User";
        }else{
          buttonText = "Unblock User";
        }
        $("#userTable").append("<tbody><tr><td>" + data.suggestions[count].data.users_firstname + "</td><td>" + data.suggestions[count].data.users_lastname + 
          "</td><td>"+ data.suggestions[count].data.users_email +"</td><td>"+ data.suggestions[count].data.users_isadmin +
          "</td><td>" + data.suggestions[count].data.users_unique_id + 
          "<td><button id='block" + count + "' type='button' onclick='blockUser(" + count + ")'>" + buttonText + "</button></td></tr></tbody>");
      }
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
      console.log("fail");
    });
    //Questions
    /*
    for(var count = 0; count < Object.keys(dataGlobalCourse.suggestions).length; count++){
      $.get(questionUrl + dataGlobalCourse.suggestions[count].data.courses_unique_id, function (data) {
        dataGlobalQuestion = data;
        console.log(data);
        console.log("SHIT");
        $("#userTable").html("<thead><tr><th>First Name</th><th>Last Name</th><th>User Email</th><th>Admin Status</th><th>User ID</th></tr></thead>");
        console.log(dataGlobalUser);
        for(var count = 0; count < Object.keys(dataGlobalUser.suggestions).length; count++){
          console.log(count);
          var buttonText = "";
          if(data.suggestions[count].data.users_isactive){
            buttonText = "Block User";
          }else{
            buttonText = "Unblock User";
          }
          $("#userTable").append("<tbody><tr><td>" + data.suggestions[count].data.users_firstname + "</td><td>" + data.suggestions[count].data.users_lastname + 
            "</td><td>"+ data.suggestions[count].data.users_email +"</td><td>"+ data.suggestions[count].data.users_isadmin +
            "</td><td>" + data.suggestions[count].data.users_unique_id + 
            "<td><button id='block" + count + "' type='button' onclick='blockUser(" + count + ")'>" + buttonText + "</button></td></tr></tbody>");
        }
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
      }).done(function(){
        console.log("DOONE");
      //document.cookie;

    }).fail(function (){
      console.log("fail");
    });
    
  }
  */
});
function listQuestions(count){
  $.get(questionUrl + dataGlobalCourse.suggestions[count].data.courses_unique_id, function (data) {
    dataGlobalQuestion[count] = data;
    console.log(dataGlobalQuestion);
    $("#courseBodyRow" + count).after("<tr id='courseQuestion" + count + "'><th></th><th>Question ID</th><th>Question</th></tr>");
    for(var num = 0; num < Object.keys(dataGlobalQuestion[count].suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalQuestion[count].suggestions[num]);
      if(dataGlobalQuestion[count].suggestions[num].data.questionisactive){
        buttonText = "Disable Question";
      }else{
        buttonText = "Enable Question";
      }
      $("#courseQuestion" + count).after("<tr><td></td><td>" + dataGlobalQuestion[count].suggestions[num].data.questionid + "</td><td>" 
        + dataGlobalQuestion[count].suggestions[num].data.title + "</td><td></td><td></td><td><button id='enableQuestion" + num + 
        "' type='button' onclick='disableQuestion(" + count + "," + num + ")'>" + buttonText + "</button></td></tr>");
    }
  }).fail(function(){

  });
}
function enableDisableCourse(count){
  var disableCourseUrl = globalUrl + "disableCourse?uniqueid=" + dataGlobalCourse.suggestions[count].data.courses_unique_id;
  var enableCourseUrl = globalUrl + "enableCourse?uniqueid=" + dataGlobalCourse.suggestions[count].data.courses_unique_id;
  if(dataGlobalCourse.suggestions[count].data.courses_isactive){
    $.get(disableCourseUrl, function(data) {
      if(data.code == 1){
        $("#enableDisable" + count).html("Enable Course");
        dataGlobalCourse.suggestions[count].data.courses_isactive = false;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function() {
        console.log("Fail to change course");
    });
  }
  else{
    $.get(enableCourseUrl, function(data) {
      if(data.code == 1){
        $("#enableDisable" + count).html("Disable Course");
        dataGlobalCourse.suggestions[count].data.courses_isactive = true;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function(){
        console.log("Fail to change course");
    });
  }
};

function blockUser(count){
  var blockUserUrl = globalUrl + "disableUser?userid=" + dataGlobalUser.suggestions[count].data.users_unique_id;
  var unblockUserUrl = globalUrl + "enableUser?userid=" + dataGlobalUser.suggestions[count].data.users_unique_id;
  if(dataGlobalUser.suggestions[count].data.users_isactive){
    $.get(blockUserUrl, function(data) {
      if(data.code == 1){
        $("#block" + count).html("Unblock User");
        dataGlobalUser.suggestions[count].data.users_isactive = false;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function() {
        console.log("Fail to change course");
    });
  }
  else{
    $.get(unblockUserUrl, function(data) {
      if(data.code == 1){
        $("#block" + count).html("Block User");
        dataGlobalUser.suggestions[count].data.users_isactive = true;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function(){
        console.log("Fail to change course");
    });
  }
};

function disableQuestion(countCourse, countQuestion){
  var disableQuestionUrl = globalUrl + "disableQuestion?uniqueid=" + dataGlobalQuestion[countCourse].suggestions[countQuestion].data.questionid;
  var enableQuestionUrl = globalUrl + "enableQuestion?uniqueid=" + dataGlobalQuestion[countCourse].suggestions[countQuestion].data.questionid;
  if(dataGlobalQuestion[countCourse].suggestions[countQuestion].data.questionisactive){
    $.get(disableQuestionUrl, function(data) {
      if(data.code == 1){
        $("#enableQuestion" + countQuestion).html("Enable Question");
        dataGlobalQuestion[countCourse].suggestions[countQuestion].data.questionisactive = false;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function() {
        console.log("Fail to change course");
    });
  }
  else{
    $.get(enableQuestionUrl, function(data) {
      if(data.code == 1){
        $("#enableQuestion" + countQuestion).html("Disable Question");
        dataGlobalQuestion[countCourse].suggestions[countQuestion].data.questionisactive = true;
      }
      else{
        console.log("Fail to change course");
      }
    })
    .fail(function(){
        console.log("Fail to change course");
    });
  }
};