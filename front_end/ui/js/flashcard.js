$(document).ready(function() {


    var deckID = getUrlParameter('deckid');

    getFlashcardDeckInfo(deckID, showDeckTitleDescription);
    getFlashcardsForDeck(deckID, showFlashcards);
    setNewFlashcardCardListener(deckID);
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

function setNewFlashcardCardListener(deckID) {
    $('#flashcardModal2').on('show.bs.modal', function (e) {
        if (document.cookie == '') {

            location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
        }
    })
    $('#postFlashcardBttn2').click(function () {
        var flashcardTerm = $('#flashcard-term').val();
        var flashcardDef = $('#flashcard-definition').val();

        var flashcardBttn = $('#postFlashcardBttn2');

        flashcardBttn.prop('disabled', true);
        flashcardBttn.text('Submitting...');

        $.ajax({
            type: 'GET',
            url: globalUrl + 'createCardInDeck/' + '?deckid=' + deckID + '&front=' + flashcardTerm + '&back=' + flashcardDef,
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(data) {
                console.log(data);
                flashcardBttn.prop('disabled', false);
                flashcardBttn.text('Create Flashcard!');

                location.reload();
            },
            error: function(xhr, status, error) {
                console.log(JSON.parse(xhr.responseText));
                flashcardBttn.prop('disabled', false);
                flashcardBttn.text('Create Flashcard!');
                //alert(data.error.message);


            }
        });
    });
}

function getFlashcardDecks(courseID, callbackFunction) {
    $.ajax({
        type: "GET",
        url: globalUrl + 'searchFlashDeckNameByCourse/' + '?courseid=' + courseID + '&query=',
        dataType: "json",
        success: function(data) {


            console.log(data);
            callbackFunction(data);
        },
        error: function(data) {
            console.log(data.error.message);

        }
    });
}

function getFlashcardDeckInfo(deckID, callbackFunction) {
    $.ajax({
        type: "GET",
        url: globalUrl + 'getFlashcardDeckInfo/' + '?deckid=' + deckID,
        dataType: "json",
        success: function(data) {


            console.log(data);
            callbackFunction(data);
        },
        error: function(data) {

        }
    });
}

function getFlashcardsForDeck(deckID, callbackFunction) {

    $.ajax({
        type: "GET",
        url: globalUrl + 'getFlashCardsForDeck/' + '?deckid=' + deckID,
        dataType: "json",
        success: function(data) {


            console.log(data);
            callbackFunction(data);
        },
        error: function(data) {
            console.log(data.error.message);

        }
    });
}

function showFlashcards(jsonFlashcardData) {

    var data = jsonFlashcardData.suggections;

    for (var i = 0; i < data.length; i++) {
        let id = 0;
        var flashcardRow = $('<tr/>')
        .attr("id", "flashcardID" + (id = data[i].data.flashcards_unqiue_id))
        .append("<td/>");

        flashcardRow.find('td').text(data[i].data.flashcards_front);

        flashcardRow
            .append("<td/>")

        flashcardRow.find('td:nth-child(2)').text(data[i].data.flashcards_back);

        /*var inner = flashcard.find('td');
    inner.addClass('front');
    inner.append('<p/>');
    inner.find('p').text(data[i].data.flashcarddecks_name);
*/
        /*flashcard.click(function () {
      location.href = globalUrl + 'flashcard.html?deckid=' + id;
    });*/
        $('#tbody').append(flashcardRow);

    }

    enableSearch()
}

function enableSearch() {

    $( '#table' ).searchable({
        striped: true,
        oddRow: { 'background-color': '#3B5998', 'color': 'white', 'padding': '25px' },
        evenRow: { 'background-color': '#fff', 'color': 'black', 'padding': '25px' },
        searchType: 'fuzzy'
    });

}

function showDeckTitleDescription(jsonFlashcardDeckData) {
    var data = jsonFlashcardDeckData.suggections[0].data;
    var title = data.flashcarddecks_name;
    var desc = data.flashcarddecks_description;

    $('#description').text(desc);
    $('#title').text(title);
}
