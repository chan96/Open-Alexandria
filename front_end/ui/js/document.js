function showDocPreviews(parsedData) {
    
     for (var i = currentQuestion; i < jsonData.length; i++) {
        console.log(jsonData[i].value);
        var $div = $('.templateDocPreview');
        var id = jsonData[i].value.documents_unique_id;
        var t = jsonData[i].value.documents_datecreated.split(/[T .]/);
        var date = t[0];
        var time = t[1];
        var $templateDocPreview = $div.clone().removeClass('templateDocPreview');

        console.log(id);
        $templateDocPreview.find('#doc0').prop('id', 'doc'+id );
        $templateDocPreview.find('img').attr("src", jsonData[i].value.documents_description);
        $templateDocPreview.find('h4').text(jsonData[i].value.documents_name);
        $templateDocPreview.find('p').text(jsonData[i].value.documents_description);
         
        $('#pinboot').append($answer);
        $templateDocPreview.show();
    }
}

function getDocPreviews(cid) {
     console.log('qid ' + uid);

    $.ajax({
        type: "GET",
        url: globalUrl + 'getDocumentPreviews/',
        data: ({ courseid : cid}),
        dataType: "html",
        success: function(data) {
            //console.log('asdf ' + data.firstname);
            var parsedData = $.parseJSON(data);
             
            showDocPreviews(parsedData);

        },
        error: function(data) {
            console.log(data.error.message);

        }
    });
}