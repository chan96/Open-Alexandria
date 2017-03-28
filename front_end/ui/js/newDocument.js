var dataGlobalUser;
var cookieField = document.cookie.split("; ");
var url = windows.location.href;
var courseid = getUrlParameter('courseid');
function submitChange(form){
    console.log(url);
    console.log(courseid);
    var theUrl = globalUrl + "uploadDocuments?courseid=" + courseid ;
  //var theUrl = "http://openalexandria.us.to/loginUser";
  var formData = $(form).serializeArray();
  console.log(formData);
  $.post(theUrl , formData, function (data) {

  }).done(function(){
      //document.cookie;

  }).fail(function (){
    console.log("Failed to upload document");
});
  return false;
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