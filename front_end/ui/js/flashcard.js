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

        flashcardBttn.prop('disabled', true);
        flashcardBttn.text('Submitting...');

        $.ajax({
            type: 'GET',
            url: globalUrl + 'createDeck/' + '?courseid=' + courseID + '&deckname=' + flashcardTitle,
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                console.log(data);
                flashcardBttn.prop('disabled', false);
                flashcardBttn.text('Create deck!');

                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(JSON.parse(xhr.responseText));
                flashcardBttn.prop('disabled', false);
                flashcardBttn.text('Create deck!');
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
