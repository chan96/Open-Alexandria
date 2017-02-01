
$('#autocomplete').autocomplete({
    serviceUrl: 'http://Openalexandria.us.to:4074/getRelatedItems/',
    onSelect: function (suggestion) {
        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});