$(document).ready(function(){

  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.3.0/jquery.autocomplete.min.js")
    .done(function(script, textStatus) {
      setClassesAutocompleteHeader();
    })
  .fail(function(jqxhr, settings, exception) {
    console.log("loading script failed.");
  });



});

function setClassesAutocompleteHeader() {
  $('#headerSearch').autocomplete({

    serviceUrl: globalUrl + 'getCourseKeyword/',
    onSearchComplete: function (query, suggestions) {
      console.log(suggestions);
    },
    formatResult: function (suggestion, currentValue) {
      console.log(suggestion);
      return suggestion.value + ' - ' + suggestion.data.courseschoolname; //+ ' - ' + suggestion.data.courseschoolwebsite;
    },
    onSelect: function (suggestion) {
      //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      console.log(suggestion.data);
      console.log(suggestion.data.coursename);

      location.href = globalUrl + 'search.html?courseid=' +  suggestion.data.courseuniqueid + '&coursename=' + suggestion.data.coursename;

    },
    showNoSuggestionNotice: true
  });
}

