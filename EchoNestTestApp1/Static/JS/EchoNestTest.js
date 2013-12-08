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
    }

    // called on completion of searchEchoNest
    function onSearchEchoNest(response) {
        if (response.result == 'error')
            alert('Error retrieving EchoNest music data.')

        // process response
    }

}

window.onload = function () {
    var echoNestTest = new EchoNestTest();
    echoNestTest.initialize();
}