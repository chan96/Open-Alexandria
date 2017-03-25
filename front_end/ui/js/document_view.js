$(document).ready(function() {
  var url = decodeURIComponent(getUrlParameter('docUrl'));
  console.log('https://view.officeapps.live.com/op/embed.aspx?src=' + url);
  //use microsoft viewer 
  //$('#doc-frame').attr('src', 'https://view.officeapps.live.com/op/embed.aspx?src=' + url);
  
  //use google doc viewer
  $('#doc-frame').attr('src', 'https://docs.google.com/gview?url=' + url + '&embedded=true');
  $('#doc-name').text(getUrlParameter('docName'));
    
    
});

function setNewPostQuestionListener() {
    $('#docQuestionModal').on('show.bs.modal', function (e) {
        if (document.cookie == '') {
          location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
        }
    })
    $('#docCommentPostBttn').click(function () {
        var commentBody = $('#comment-body').val();
        var userID = getUserID();
        var docID = getUrlParameter('docId');
        var postBttn = $('#postBttn');
        console.log('\nuserid: ' + userID + '\ndocid :' + docID + '\nbody: ' + commentBody);

        postBttn.prop('disabled', true);
        postBttn.text('Submitting...');

        $.ajax({
            type: 'POST',
            url: globalUrl + 'postDocumentComment/',
            data: { 
                   'commentbody': commentBody,
                   'userid': userID,
                   'creatorid': docID},
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                console.log(data);
                postBttn.prop('disabled', false);
                postBttn.text('Post Comment');

                location.reload();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
                postBttn.prop('disabled', false);
                postBttn.text('Post Comment');
                alert('Could not contact server :O');


            }
        });
    });
}