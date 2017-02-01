
$( "#autocomplete" ).autocomplete({
    source: function( request, response ) {
        $.ajax({
            dataType: "json",
            type : 'Get',
            url: 'Openalexandria.us.to:4074/getRelatedItems/open',
            success: function(data) {
                $('#autocomplete').removeClass('ui-autocomplete-loading');  
                // hide loading image
                alert("hi");
                response( $.map( data, function(item) {
                    // your operation on data
                                    alert("hi");

                }));
            },
            error: function(data) {
                alert("hi");
                $('#autocomplete').removeClass('ui-autocomplete-loading');  
            }
        });
    },
    minLength: 3,
    open: function() {},
    close: function() {},
    focus: function(event,ui) {},
    select: function(event, ui) {}
});