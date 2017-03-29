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
      console.log(dataGlobalDocument.suggestions[num]);
      $("#documentTable").append("<tbody id='documentBodyTable'><tr id='documentBodyRow"+ num + "'><td>" + num + "</td><td>" + data.suggestions[num].data.documentname + 
        "</td><td id='tags" + num + "'></td><td><input id='tag" + num + "' type='text' name='FirstName' value=''> <button id='addTags" + num + 
        "' type='button' onclick='addTags(" + num +")'>Add Tags</button></td></tr>");
      getTags(num);

    }

  }).fail(function(){
    console.log("failed");
  });
}
function getTags(count){
  $.get(getTagsUrl + dataGlobalDocument.suggestions[count].data.documentuniqueid, function(data){
    //console.log(data);
    console.log(data[0].taglist_text);
    for(var num = 0; num < data.length; num++){
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
  }).fail(function(){

  });
}