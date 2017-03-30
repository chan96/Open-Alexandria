/*
var dataGlobalUser;
var cookieField = document.cookie.split("; ");
var url = window.location.href;
var courseid = getParameterByName('courseid');
function submitChange(){
    var selectedFileType = document.getElementById('js-upload-files').files[0].type.split("/");
    var theUrl = globalUrl + "uploadDocuments?courseid=" + courseid + "&type=" + selectedFileType[1];
    console.log(theUrl);
    var files = $('#js-upload-files').get(0).files;
    var file = files[0];
    console.log(file);
    var formData = new FormData();
    formData.append('document', file, file.name);
      
      $.ajax({
        url: theUrl,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
               // .. do something
           },
           error: function(jqXHR, textStatus, errorMessage) {
               console.log(errorMessage); // Optional
           }
       });
    //var formData = new FormData($("form#js-upload-form")[0]);
    
    $.post(theUrl , formData, function (data) {
        console.log(data);
    }).done(function(){
          //document.cookie;

      }).fail(function (){
        console.log("Failed to upload document");
    });
    
    return false;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
*/
$(document).ready(function() {


  $('#js-upload-submit').click( function(){

    console.log(':o');
    var files = $('#js-upload-files').get(0).files;

    console.log(files);
    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();
      var courseid = getUrlParameter('courseid');
      var type;
      var desc;

      // loop through all the selected files and add them to the formData object
        var file = files[0];

        // add the files to formData object for the data payload
        formData.append('document', file, file.name);
        type = 'pdf';
        desc = 'test';

      $.ajax({
        url: globalUrl + 'uploadDocuments?courseid=' + courseid + '&type=' + type + '&description=' + desc,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
        },
        error: function(xhr, status, error) {
          console.log(xhr.responseText);
        }
      });

    }
  });
});

