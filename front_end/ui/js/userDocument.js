var dataGlobalUser;
var documentUrl = globalUrl + "searchDocumentByUser?query=&";
var dataGlobalDocument;
var cookieField = document.cookie.split("; ");
$(document).ready(function(){
  	//var theUrl = "http://localhost:3000/getCourseKeyword?query=";
  var userUrl = globalUrl +"getUserInfo";
    //USERS
    $.get(userUrl, function (data) {
      dataGlobalUser = data;
      console.log(document.cookie);
    }).done(function(){
    }).fail(function (){
      console.log("fail");
    });
    $.get(documentUrl + cookieField[1], function (data) {
    dataGlobalDocument = data;
    console.log(dataGlobalDocument);
    ///$("#userBodyRow" + count).after("<tr id='userDocument" + count + "'><th></th><th>Document ID</th><th></th><th>Document</th></tr>");
    for(var num = 0; num < Object.keys(dataGlobalDocument.suggestions).length; num++){
      console.log(dataGlobalDocument.suggestions[num]);
      $("#documentTable").append("<tbody id='documentBodyTable'><tr id='courseBodyRow"+ num + "'><td>" + num + "</td><td>" 
        + data.suggestions[num].data.documentname + "</td><td><button id='enableDocument" + num + 
        "' type='button' onclick=''>Add Tags</button></td></tr>");
      /*
      $("#userDocument" + count).after("<tr><td></td><td>" + dataGlobalDocument.suggestions[num].data.documentuniqueid + "</td><td></td><td>" 
        + dataGlobalDocument.suggestions[num].data.documentname + "</td><td></td><td></td><td><button id='enableDocument" + num + 
        "' type='button' onclick='disableDocument(" + count + "," + num + ")'>" + buttonText + "</button></td></tr>");
        */
    }
  }).fail(function(){
    console.log("failed");
  });
});