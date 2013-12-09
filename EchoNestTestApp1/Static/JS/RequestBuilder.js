"use strict";

// encapsulates calls to create and post ajax requests to echo nest web service
function EchoRequestBuilder() {
    if (window.RequestBuilder)
        return window.RequestBuilder;

    window.RequestBuilder = this;

    // build and send request 
    this.postRequest = function (url, callbackFunction, request) {
        $.ajax({
            url: url,
            dataType: "json",
            data: request,
            success: function (response) {
                callbackFunction(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var response = {
                    result: "error",
                    error: errorThrown,
                    errorText: textStatus
                };
                callbackFunction(response);
            }
        });
    }
}