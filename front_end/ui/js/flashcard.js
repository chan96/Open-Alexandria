var nextRow;
var prevRow;

$(document).ready(function() {

  if (location.href.includes('flashcard.html')) {
    var deckID = getUrlParameter('deckid');

    getFlashDeckById(deckID, showDeckTitleDescription);
    getFlashcardsForDeck(deckID, showFlashcards);
    setNewFlashcardCardListener(deckID);
    setTestFlashcardView();
  }
});

function setNewFlashcardListener() {
  $('#flashcardModal').on('show.bs.modal', function (e) {
    if (document.cookie == '') {

      location.href = globalUrl + '/login.html' + '?redirect=' + location.href;
    }
    $('html, body').animate({scrollTop : '0px'}, 0);

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
    $('html, body').animate({scrollTop : '0px'}, 0);

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

function getFlashDeckById(deckID, callbackFunction) {
  $.ajax({
    type: "GET",
    url: globalUrl + 'getFlashDeckById/' + '?deckid=' + deckID,
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

  var data = jsonFlashcardData.suggestions;

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
  var data = jsonFlashcardDeckData.suggestions[0].data;
  var title = data.flashcarddecks_name;
  var desc = data.flashcarddecks_description;

  $('#description').text(desc);
  $('#title').text(title);
}

function createFlashcard(row) {

  var flashcard = $('<div/>')
    //.attr("id", "deckid" + (id = data[i].data.flashcarddecks_unique_id))
    .addClass("notecard")
    .append("<div/>");

  var inner = flashcard.find('div');
  inner.addClass('front');
  inner.append('<p/>');
  front = inner.find('p');
  front.text($(row).find("td:nth-child(1)").text());

  console.log('hi ' + $(row).find("td:nth-child(1)").text());

  flashcard.append("<div/>");
  inner = flashcard.find("div:nth-child(2)");
  inner.addClass('back');
  inner.append('<p/>');
  back = inner.find('p');
  back.text(row.find("td:nth-child(2)").text());

  return flashcard;
}

function disableNextPrevBttns(row) {
  var pRow = $(row).prev();
  var nRow = $(row).next();

  if ($(nextRow).length === 0) {
    $('#next-btn').prop('disabled', true);
  } else {

    $('#next-btn').prop('disabled', false);
  }
  if ($(prevRow).length === 0) {
    $('#prev-btn').prop('disabled', true);
  } else {

    $('#prev-btn').prop('disabled', false);
  }
}
function enableNextPrevBttns() {

  $('#next-btn').prop('disabled', false);

  $('#prev-btn').prop('disabled', false);
}

function updateTestHeader(td) {

  var index = $(td).parent().parent().children().index($(td).parent());

  var heading = (index + 1) + ' of ' + ($('#table tr').length - 1);
  $('#test-modal-header').text(heading);

}

function setTestFlashcardView() {

  $('#testModal').on('hidden.bs.modal', function () {
    enableNextPrevBttns();

  })

  $('#table').on("click", "td", function(){
    var heading = '';
    $('#test-modal-body').empty();
    prevRow = $(this).parent().prev();
    nextRow = $(this).parent().next();
    disableNextPrevBttns($(this).parent());
    console.log(nextRow);
    console.log(nextRow.length);


    //var title = $(this).parent('a').attr("title");
    //$('.modal-title').html(title);


    createFlashcard($(this).parent()).appendTo('#test-modal-body');

    updateTestHeader(this);

    $('#testModal').modal({show:true});
  });

  $('#next-btn').click(function() {


    $('#test-modal-body').empty();
    createFlashcard($(nextRow)).appendTo('#test-modal-body');
    updateTestHeader($(nextRow).find('td'));

    prevRow = $(nextRow).prev();
    nextRow = $(nextRow).next();
    console.log(nextRow);

    disableNextPrevBttns($(this).parent());
    //front.text(nextRow.parent().find("td:nth-child(1)").text());
    //back.text($(nextRow).parent().find("td:nth-child(2)").text());
  });
  $('#prev-btn').click(function() {
    $('#test-modal-body').empty();
    createFlashcard($(prevRow)).appendTo('#test-modal-body');
    updateTestHeader($(prevRow).find('td'));

    nextRow = prevRow.next();
    prevRow = $(prevRow).prev();

    disableNextPrevBttns($(this).parent());
  });
}
