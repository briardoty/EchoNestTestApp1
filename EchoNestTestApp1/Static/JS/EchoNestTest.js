"use strict";

// container function for all echo nest call functionality
function EchoNestTest() {
    var common = new Common();

    // connect events
    this.initialize = function () {
        $('#searchButton').click(searchEchoNest);
    }

    // create JSON request for echo nest data
    function searchEchoNest() {
        var searchString = $('#searchString').val();
        var requestBuilder = new EchoRequestBuilder();
        var request = {};

        request['api_key'] = common.apikey;
        request['name'] = 'radiohead'
        
        requestBuilder.postRequest(common.echoNestURL + 'artist', onSearchEchoNest, JSON.stringify(request), 1);
    }

    // called on completion of searchEchoNest
    function onSearchEchoNest(response) {
        if (response.result == 'error')
            alert('Error retrieving EchoNest music data.')

        // process response
        alert("Hello");
    }

}

window.onload = function () {
    var echoNestTest = new EchoNestTest();
    echoNestTest.initialize();
}