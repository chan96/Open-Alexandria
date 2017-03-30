$(document).ready(function() {


  $('#upload-submit').click( function(){

    console.log(':o');
    var files = $('#js-upload-files').get(0).files;

    console.log(files);
    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();
      var courseid = getUrlParameter('courseid');
      var file = files[0];
      var fileName = file.name;
      var type = fileName.substring(fileName.indexOf('.'));
      var desc = $('#upload-text').val().trim();

      if (desc.length < 10) {
        alert('Description must be at least 10 characters');
        return;
      } 

      console.log('type ' + type);
      console.log('desc ' + desc);
      // add the files to formData object for the data payload
      formData.append('document', file, file.name);

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

    } else {

      alert('Select a file to upload');
    }
  });
});
