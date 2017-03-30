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
