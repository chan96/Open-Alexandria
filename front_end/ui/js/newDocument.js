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
    /*
    $.post(theUrl , formData, function (data) {
        console.log(data);
    }).done(function(){
          //document.cookie;

      }).fail(function (){
        console.log("Failed to upload document");
    });
    */
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
/*
+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        console.log(files)
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);
*/