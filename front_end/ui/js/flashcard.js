$(document).ready(function() {

    $( '#table' ).searchable({
        striped: true,
        oddRow: { 'background-color': '#f5f5f5' },
        evenRow: { 'background-color': '#fff' },
        searchType: 'fuzzy'
    });
});

function setNewFlashcardListener() {
    $('#flashcardModal').on('show.bs.modal', function (e) {
        if (document.cookie == '') {

            location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
        }
    })
    $('#postFlashcardBttn').click(function () {
        var flashcardTitle = $('#flashcard-title').val();
        var courseID = getUrlParameter('courseid');
        var flashcardBttn = $('#postFlashcardBttn');
        console.log(flashcardTitle + ' ' + courseID);

        postBttn.prop('disabled', true);
        postBttn.text('Submitting...');

        $.ajax({
            type: 'POST',
            url: globalUrl + 'createDeck/' + '?courseid=' + courseID + '&deckname=' + flashcardTitle,
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                console.log(data);
                postBttn.prop('disabled', false);
                postBttn.text('Create deck!');

                location.reload();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
                postBttn.prop('disabled', false);
                postBttn.text('Create deck!');
                //alert(data.error.message);


            }
        });
    });
}

function getFlashcardDecks(courseID) {
    $.ajax({
        type: "GET",
        url: globalUrl + 'searchFlashDeckNameByCourse/',
        data: ({ courseid : courseID}),
        dataType: "json",
        success: function(data) {

            console.log(data);

        },
        error: function(data) {
            console.log(data.error.message);

        }
    });
}