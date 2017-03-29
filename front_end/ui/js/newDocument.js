var dataGlobalUser;
var cookieField = document.cookie.split("; ");
var url = window.location.href;
var courseid = getParameterByName('courseid');
function submitChange(form){
    var selectedFileType = document.getElementById('js-upload-files').files[0].type.split("/");
    var theUrl = globalUrl + "uploadDocuments?courseid=" + courseid + "&fileType=" + selectedFileType[1];
    console.log(theUrl);
  //var theUrl = "http://openalexandria.us.to/loginUser";
  //var formData = new FormData(document.forms.namedItem("fileinfo"));
  var formData = $(form).serializeArray();
  console.log(formData);
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