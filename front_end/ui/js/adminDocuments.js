var userID;
var dataGlobalDocument = [];
var documentUrl;

$(document).ready(function() {
	documentUrl = globalUrl + "searchDocumentByUserAdmin?query=&userid=";

    userID = getUrlParameter('userid');
    $("#heading").append("<h3>Documents for User ID " + userID + "</h3>");
    listDocumentsByUser(1);
});
function listDocumentsByUser(count){
  $.get(documentUrl + userID, function (data) {
    dataGlobalDocument[count] = data;
    console.log(dataGlobalDocument);
    $("#documentTable").html("<thead><tr><th>Document ID</th><th>Document</th></tr></thead>");
    for(var num = 0; num < Object.keys(dataGlobalDocument[count].suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalDocument[count].suggestions[num]);
      if(dataGlobalDocument[count].suggestions[num].data.documentisactive){
        buttonText = "Disable Document";
      }else{
        buttonText = "Enable Document";
      }

      $("#documentTable").append("<tbody id='documentBodyTable" + count + "'><tr id='documentBodyRow" + count + "'><td>" 
        + dataGlobalDocument[count].suggestions[num].data.documentuniqueid  + "</td><td>" + dataGlobalDocument[count].suggestions[num].data.documentname + 
        "</td><td><button id='enableDocument" + num + "' type='button' onclick='disableDocument(" + count + "," + num + ")'>" 
        + buttonText + "</button></td></tr>");
      /*
      $("#userDocument" + count).after("<tr><td></td><td>" + dataGlobalDocument[count].suggestions[num].data.documentuniqueid + "</td><td></td><td>" 
        + dataGlobalDocument[count].suggestions[num].data.documentname + "</td><td></td><td></td><td><button id='enableDocument" + num + 
        "' type='button' onclick='disableDocument(" + count + "," + num + ")'>" + buttonText + "</button></td></tr>");
        */
    }
    if(Object.keys(dataGlobalDocument[count].suggestions).length == 0){
      $("#documentTable").append("<tbody id='documentBodyTable" + count + "'><tr id='documentBodyRow" + count + "'><td>No documents exist for this user</td></tr>");
    }
  }).fail(function(){

  });
}

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