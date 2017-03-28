$(document).ready(function() {
  var url = decodeURIComponent(getUrlParameter('docUrl'));
  var docID = getUrlParameter('docId');
  console.log('https://view.officeapps.live.com/op/embed.aspx?src=' + url);
  //use microsoft viewer 
  //$('#doc-frame').attr('src', 'https://view.officeapps.live.com/op/embed.aspx?src=' + url);

  //use google doc viewer
  $('#doc-frame').attr('src', 'https://docs.google.com/gview?url=' + url + '&embedded=true');
  $('#doc-name').text(getUrlParameter('docName'));

  setNewPostDocumentListener(docID); 
  setComments(docID);
});

function setNewPostDocumentListener(docID) {
  $('#docQuestionModal').on('show.bs.modal', function (e) {
    if (document.cookie == '') {
      location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
    }
  })
  $('#docCommentPostBttn').click(function () {
    var commentBody = $('#comment-body').val();
    var userID = getUserID();
    var postBttn = $('#postBttn');
    console.log('\nuserid: ' + userID + '\ndocid :' + docID + '\nbody: ' + commentBody);

    postBttn.prop('disabled', true);
    postBttn.text('Submitting...');

    $.ajax({
      type: 'POST',
      url: globalUrl + 'postDocumentComment/?documentid=' + docID,
      data: { 
        'text': commentBody,
      },
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


function setComments(docID) {
  $.ajax({
    type: "GET",
    url: globalUrl + 'getDocumentComment/',
    data: ({ documentid : docID}),
    dataType: "html",
    success: function(data) {
      //console.log(data);
      var jsonData = $.parseJSON(data).suggestions;
      console.log(jsonData);
      for (var i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i].data.title);
        var $div = $('#question0');
        var id = jsonData[i].data.questionid;
        console.log(id);
        var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) + id;
        var $question = $div.clone().prop('id', 'question'+num );
        var qid = $question.attr('id');
        console.log(qid);

        $question.find('p').text(jsonData[i].data.title);



        $('#questions-row').append($question);
        setQuestionOnClick(qid);
        $question.show();
      }

    },
    error: function(data) {
      console.log(data.error.message);

    }
  });

}
