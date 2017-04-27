var userID;
var dataGlobalReport = [];
var reportUrl;

$(document).ready(function() {
	reportUrl = globalUrl + "getReport";

    //userID = getUrlParameter('userid');
    $("#heading").append("<h3>Reports</h3>");
    listReports(1);
});
function listReports(count){
  $.get(reportUrl, function (data) {
    dataGlobalReport[count] = data;
    console.log(dataGlobalReport);
    $("#reportTable").html("<thead><tr><th>Sender ID</th><th>Item ID</th><th>Report Message</th></tr></thead>");
    for(var num = 0; num < Object.keys(dataGlobalReport[count].suggestions).length; num++){
      var buttonText = "";
      console.log(dataGlobalReport[count].suggestions[num]);

      $("#reportTable").append("<tbody id='reportBodyTable" + count + "'><tr id='reportBodyRow" + count + "'><td>" 
        + dataGlobalReport[count].suggestions[num].data.message_sender_id  + "</td><td>" + dataGlobalReport[count].suggestions[num].data.message_item_id + 
        "</td><td>" + dataGlobalReport[count].suggestions[num].data.message_text + "</td></tr>");
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
