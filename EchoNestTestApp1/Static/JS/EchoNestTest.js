"use strict";

// container function for all echo nest call functionality
function EchoNestTest() {
    var common = new Common();

    // connect events
    this.initialize = function () {
        $('#searchButton').click(searchArtists);
        $('#artistName').change(searchSongs);
        $('#songName').change(pullAudioSummary);
    }

    // create JSON request for echo nest artist data
    function searchArtists() {
        var searchString = $('#searchString').val();
        var url = common.echoNestURL + '/artist/search'; 

        var request = {};
        request['api_key'] = common.apiKey;
        request['name'] = searchString;
        request['format'] = "json";
        
        var requestBuilder = new EchoRequestBuilder();
        requestBuilder.postRequest(url, onArtistSearch, request);
    }

    // called on completion of searchArtists
    function onArtistSearch(response) {
        if (response.result == 'error')
            alert('Error retrieving EchoNest artist data.')

        // clear any old data
        clearArtistData();
        clearSongData();

        // process response
        $.each(response.response.artists, function () {
            $('#artistName').append($('<option />').val(this.id).text(this.name));
        });
    }

    // create request for echo nest song data given a selected artist
    function searchSongs() {
        var artistID = $('#artistName').val();
        if (artistID != 'select') {
            var url = common.echoNestURL + '/song/search';

            var request = {};
            request['api_key'] = common.apiKey;
            request['artist_id'] = artistID;
            request['results'] = 50;
            request['format'] = "json";

            var requestBuilder = new EchoRequestBuilder();
            requestBuilder.postRequest(url, onSongSearch, request);
        }
    }

    // called on completion of searchSongs
    function onSongSearch(response) {
        if (response.result == 'error')
            alert('Error retrieving EchoNest song data.')

        // clear any old data
        clearSongData();

        // process response
        $.each(response.response.songs, function () {
            $('#songName').append($('<option />').val(this.id).text(this.title));
        });
    }

    // create request for echo nest audio summary given selected track
    function pullAudioSummary() {
        return;
    }

    // clear any artist data on page
    function clearArtistData() {
        $('#artistName')
            .find('option')
            .remove()
            .end()
            .append('<option value="select">(Select an artist)</option>')
            .val('select');
    }

    // clear any song data on page
    function clearSongData() {
        $('#songName')
            .find('option')
            .remove()
            .end()
            .append('<option value="select">(Select a song)</option>')
            .val('select');
    }
}

window.onload = function () {
    var echoNestTest = new EchoNestTest();
    echoNestTest.initialize();
}