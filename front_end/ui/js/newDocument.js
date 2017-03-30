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
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // add the files to formData object for the data payload
        formData.append('files[]', file, file.name);
        type = 'pdf';
        desc = 'test';
      }

      $.ajax({
        url: globalUrl + 'uploadDocuments?courseid=' + courseid + '&type=' + type + '&description=' + desc,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
        },
        xhr: function() {
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              //$('.progress-bar').text(percentComplete + '%');
              //$('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
              if (percentComplete === 100) {
                //$('.progress-bar').html('Done');
                console.log('done');
              }

            }

          }, false);

          return xhr;
        }
      });

    }
  });
});
