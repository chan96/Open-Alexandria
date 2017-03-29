function showDocPreviews(parsedData) {
    var jsonData = parsedData.suggestions;
    
     for (let i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i].value);
        var $div = $('.templateDocPreview');
        var id = jsonData[i].data.documentuniqueid;
        var t = jsonData[i].data.documentdatecreated.split(/[T .]/);
        var date = t[0];
        var time = t[1];
        var link = jsonData[i].data.documentlink;
        var docName = jsonData[i].data.documentname;
        var $templateDocPreview = $div.clone().removeClass('templateDocPreview');
        var previewSrc = (link.includes('.gif') ? link : link + '.jpg');

        console.log(jsonData[i].data);
        $templateDocPreview.find('#doc0').prop('id', 'doc'+id );
        $templateDocPreview.find('img').attr("src", previewSrc);
        $templateDocPreview.find('h4').text(jsonData[i].data.documentname);
        $templateDocPreview.find('p').text(jsonData[i].data.documentdescription);
         $templateDocPreview.click(function() {
           console.log('link ' + link);
             window.location.href = globalUrl + 'document_view.html' + '?docName=' + jsonData[i].data.documentname + '&docID=' + jsonData[i].data.documentuniqueid + '&docUrl=' + encodeURIComponent(jsonData[i].data.documentlink);
         })
         
        $('#pinBoot').append($templateDocPreview);
        $templateDocPreview.show();
        console.log($templateDocPreview);
    }
}

function getDocPreviews(cid) {

    $.ajax({
        type: "GET",
        url: globalUrl + 'searchDocumentByCourse/',
        data: ({ courseid : cid, query : ''}),
        dataType: "html",
        success: function(data) {
            //console.log('asdf ' + data.firstname);
            var parsedData = $.parseJSON(data);
            console.log(parsedData.suggestions);
             
            showDocPreviews(parsedData);

        },
        error: function(data) {
            console.log(data.error.message);

        }
    });
}
