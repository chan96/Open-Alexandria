var dataGlobalUser;
var documentUrl = globalUrl + "searchDocumentByUser?query=&";
var tagsUrl = globalUrl + "addTagToDocument?documentid=";
var getTagsUrl = globalUrl + "getTagsFromDocument?documentid="
var dataGlobalDocument;
var cookieField = document.cookie.split("; ");

function getInfo(){
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

    for(var num = 0; num < Object.keys(dataGlobalDocument.suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalDocument.suggestions[num]);
      if(dataGlobalDocument.suggestions[num].data.documentisactive){
        buttonText = "Disable Document";
      }else{
        buttonText = "Enable Document";
      }
      $("#documentTable").append("<tbody id='documentBodyTable'><tr id='documentBodyRow"+ num + "'><td>" + num + "</td><td>" + data.suggestions[num].data.documentname + 
        "</td><td id='tags" + num + "'></td><td><input id='tag" + num + "' type='text' name='FirstName' value=''> <button id='addTags" + num + 
        "' type='button' onclick='addTags(" + num +")'>Add Tags</button></td><td><button id='enableDocument" + num + 
        "' type='button' onclick='disableDocument(" + num + ")'>" + buttonText + "</button></td></tr>");
      getTags(num);

    }

  }).fail(function(){
    console.log("failed");
  });
}
function getTags(count){
  $.get(getTagsUrl + dataGlobalDocument.suggestions[count].data.documentuniqueid, function(data){
    //console.log(data);
    //console.log(data[0].taglist_text);
    for(var num = 0; num < data.length; num++){
      console.log(data[num].taglist_text);
      $("#tags" + count).append(data[num].taglist_text);
      if(num < data.length - 1){
        $("#tags" + count).append(", ");
      }
    }

  }).fail(function(){
    console.log("Failed to get tags");
  });
}

$(document).ready(function(){
  getInfo();

});

function addTags(count){
  $.get(tagsUrl + dataGlobalDocument.suggestions[count].data.documentuniqueid + "&tag=" + document.getElementById("tag" + count).value, function (data) {
    console.log(data);
    document.getElementById("tag" + count).value='';
    location.reload();
  }).fail(function(){

  });
}

function disableDocument(countDocument){
  var disableDocumentUrl = globalUrl + "disableDocument?uniqueid=" + dataGlobalDocument.suggestions[countDocument].data.documentuniqueid;
  var enableDocumentUrl = globalUrl + "enableDocument?uniqueid=" + dataGlobalDocument.suggestions[countDocument].data.documentuniqueid;
  if(dataGlobalDocument.suggestions[countDocument].data.documentisactive){
    $.get(disableDocumentUrl, function(data) {
      if(data.code == 1){
        $("#enableDocument" + countDocument).html("Enable Document");
        dataGlobalDocument.suggestions[countDocument].data.documentisactive = false;
        console.log("Success");
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
        dataGlobalDocument.suggestions[countDocument].data.documentisactive = true;
        console.log("Success");
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