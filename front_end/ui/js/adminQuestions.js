var courseID;
var dataGlobalQuestion = [];
var questionUrl;

$(document).ready(function() {
    questionUrl = globalUrl + "getAllQuestions?courseid=";

    courseID = getUrlParameter('courseid');
    $("#heading").append("<h3>Questions for Course ID " + courseID + "</h3>");
    listQuestions(1);
});
function listQuestions(count){
  $.get(questionUrl + courseID, function (data) {
    dataGlobalQuestion[count] = data;
    console.log(dataGlobalQuestion);
    $("#questionTable").html("<thead><tr><th>Question ID</th><th>Question</th></tr></thead>");
    //$("#courseBodyRow" + count).after("<tr id='courseQuestion" + count + "'><th></th><th>Question ID</th><th>Question</th></tr>");
    for(var num = 0; num < Object.keys(dataGlobalQuestion[count].suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalQuestion[count].suggestions[num]);
      if(dataGlobalQuestion[count].suggestions[num].data.questionisactive){
        buttonText = "Disable Question";
      }else{
        buttonText = "Enable Question";
      }
      /*
      $("#courseQuestion" + count).after("<tr><td></td><td>" + dataGlobalQuestion[count].suggestions[num].data.questionid + "</td><td>" 
        + dataGlobalQuestion[count].suggestions[num].data.title + "</td><td></td><td></td><td><button id='enableQuestion" + num + 
        "' type='button' onclick='disableQuestion(" + count + "," + num + ")'>" + buttonText + "</button></td></tr>");
      */
      $("#questionTable").append("<tbody id='questionBodyTable" + count + "'><tr id='questionBodyRow" + count + "'><td>" 
        + dataGlobalQuestion[count].suggestions[num].data.questionid + "</td><td>" + dataGlobalQuestion[count].suggestions[num].data.title + 
        "</td><td><button id='enableQuestion" + num + "' type='button' onclick='disableQuestion(" + count + "," + num + ")'>" 
        + buttonText + "</button></td></tr>");
        
    }
    if(Object.keys(dataGlobalQuestion[count].suggestions).length == 0){
      $("#questionTable").append("<tbody id='questionBodyTable" + count + "'><tr id='questionBodyRow" + count + "'><td>No questions exist for this course</td></tr>");
    }
  }).fail(function(){

  });
}
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
