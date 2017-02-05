
$('#autocomplete').autocomplete({
    serviceUrl: 'http://Openalexandria.us.to:4074/getCourseKeyword/',
    onSelect: function (suggestion) {
        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        console.log(suggestion.data);
        console.log(suggestion.data.coursename);
        
        location.href = 'search.html?courseid=' +  suggestion.data.courseuniqueid + '&coursename=' + suggestion.data.coursename.replace(/\s+/g, '');
        
    }
})

/*$( "#txtcity" ).autocomplete({
  // do whatever
}).val('Banana').data('autocomplete')._trigger('select');*/