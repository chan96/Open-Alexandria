var dataGlobalCourse;
var dataGlobalUser;
var dataGlobalQuestion = [];
var dataGlobalDocument = [];
var courseUrl;
var userUrl;
var questionUrl;
var documentUrl;


$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  courseUrl = globalUrl + "getAllCourse";
  userUrl = globalUrl +"listAllUsers";
  questionUrl = globalUrl + "getAllQuestions?courseid=";
  documentUrl = globalUrl + "searchDocumentByUserAdmin?query=&userid=";

  	//COURSE
  	$.get(courseUrl, function (data) {
      dataGlobalCourse = data;
      $("#courseTable").html("<thead><tr><th>Course Description</th><th>Course Name</th><th>Course ID</th></tr></thead>");

      for(var count = 0; count < Object.keys(dataGlobalCourse.suggestions).length; count++){
        var buttonText = "";
        if(data.suggestions[count].data.courses_isactive){
          buttonText = "Disable Course";
        }else{
          buttonText = "Enable Course";
        }
        $("#courseTable").append("<tbody id='courseBodyTable" + count + "'><tr id='courseBodyRow"+ count + "'><td>" + 
          data.suggestions[count].data.courses_description + "</td><td>" + data.suggestions[count].data.courses_name + 
          "</td><td>"+ data.suggestions[count].data.courses_unique_id +
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
        $("#userTable").append("<tbody id='userBodyTable" + count + "'><tr id='userBodyRow" + count + "'><td>" + data.suggestions[count].data.users_firstname + "</td><td>" + data.suggestions[count].data.users_lastname + 
          "</td><td>"+ data.suggestions[count].data.users_email +"</td><td>"+ data.suggestions[count].data.users_isadmin +
          "</td><td>" + data.suggestions[count].data.users_unique_id + 
          "</td><td><button id='block" + count + "' type='button' onclick='blockUser(" + count + ")'>" + buttonText + "</button></td><td>"
          + "<button id='listD" + count + "' type='button' onclick='listDocumentsByUser(" + count + ")'>List All Documents</button></td></tr></tbody>");
      }
        //window.location.href = 'http://openalexandria.us.to:3000/login.html';
    }).done(function(){
      //document.cookie;

    }).fail(function (){
      console.log("fail");
    });
});
function listQuestions(count){
  location.href = globalUrl + 'adminQuestions.html?courseid=' +  dataGlobalCourse.suggestions[count].data.courses_unique_id;
  /*
  $.get(questionUrl + dataGlobalCourse.suggestions[count].data.courses_unique_id, function (data) {
    dataGlobalQuestion[count] = data;
    console.log(dataGlobalQuestion);
    $("#questionTable").html("<thead><tr><th>Question ID</th><th>Question</th></tr></thead>");
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

      $("#questionTable").append("<tbody id='questionBodyTable" + count + "'><tr id='questionBodyRow" + count + "'><td>" 
        + dataGlobalQuestion[count].suggestions[num].data.questionid + "</td><td>" + dataGlobalQuestion[count].suggestions[num].data.title + 
        "</td><td><button id='enableQuestion" + num + "' type='button' onclick='disableQuestion(" + count + "," + num + ")'>" 
        + buttonText + "</button></td></tr>");

    }
  }).fail(function(){

  });
          */
}
function listDocumentsByUser(count){
  location.href = globalUrl + 'adminDocuments.html?userid=' +  dataGlobalUser.suggestions[count].data.users_unique_id;
  /*
  $.get(documentUrl + dataGlobalUser.suggestions[count].data.users_unique_id, function (data) {
    dataGlobalDocument[count] = data;
    console.log(dataGlobalDocument);
    $("#userBodyRow" + count).after("<tr id='userDocument" + count + "'><th></th><th>Document ID</th><th></th><th>Document</th></tr>");
    for(var num = 0; num < Object.keys(dataGlobalDocument[count].suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalDocument[count].suggestions[num]);
      if(dataGlobalDocument[count].suggestions[num].data.documentisactive){
        buttonText = "Disable Document";
      }else{
        buttonText = "Enable Document";
      }
      $("#userDocument" + count).after("<tr><td></td><td>" + dataGlobalDocument[count].suggestions[num].data.documentuniqueid + "</td><td></td><td>" 
        + dataGlobalDocument[count].suggestions[num].data.documentname + "</td><td></td><td></td><td><button id='enableDocument" + num + 
        "' type='button' onclick='disableDocument(" + count + "," + num + ")'>" + buttonText + "</button></td></tr>");
    }
  }).fail(function(){

  });
  */
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

function disableDocument(countUser, countDocument){
  var disableDocumentUrl = globalUrl + "disableDocument?uniqueid=" + dataGlobalDocument[countUser].suggestions[countDocument].data.documentuniqueid;
  var enableDocumentUrl = globalUrl + "enableDocument?uniqueid=" + dataGlobalDocument[countUser].suggestions[countDocument].data.documentuniqueid;
  if(dataGlobalDocument[countUser].suggestions[countDocument].data.documentisactive){
    $.get(disableDocumentUrl, function(data) {
      if(data.code == 1){
        $("#enableDocument" + countDocument).html("Enable Document");
        dataGlobalDocument[countUser].suggestions[countDocument].data.documentisactive = false;
      }
      else{
        console.log("Fail to change document");
      }
    })
    .fail(function() {
        console.log("Fail to change document");
    });
  }
  else{
    $.get(enableDocumentUrl, function(data) {
      if(data.code == 1){
        $("#enableDocument" + countDocument).html("Disable Document");
        dataGlobalDocument[countUser].suggestions[countDocument].data.documentisactive = true;
      }
      else{
        console.log("Fail to change document");
      }
    })
    .fail(function(){
        console.log("Fail to change document");
    });
  }
};