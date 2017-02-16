
$('#autocomplete').autocomplete({

    serviceUrl: globalUrl + 'getCourseKeyword/',
    onSearchComplete: function (query, suggestions) {
        console.log(suggestions);
    },
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        console.log(suggestion.data);
        console.log(suggestion.data.coursename);

        location.href = globalUrl + 'search.html?courseid=' +  suggestion.data.courseuniqueid + '&coursename=' + suggestion.data.coursename;

    },
    
    showNoSuggestionNotice: true
})

/*$( "#txtcity" ).autocomplete({
  // do whatever
}).val('Banana').data('autocomplete')._trigger('select');*/
