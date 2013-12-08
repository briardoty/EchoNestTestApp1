"use strict";

// encapsulates calls to create and post ajax requests to echo nest web service
function RequestBuilder() {
    if (window.RequestBuilder)
        return window.RequestBuilder;

    window.RequestBuilder = this;
    $.support.cors = true;
    $.startTimes = [];
    $.ajaxCalls = [];
    $.abortAllAjaxCalls = function () {
        $($.ajaxCalls).each(function (index, jqXHR) {
            try {
                jqXHR.abort();
            } catch (e) { }
        });
    }

    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            $.ajaxCalls.push(jqXHR);
        }
    });

    this.id = new Date();
    this.isLive = false;

    this.ajaxCurrentRequestCount = 0;
    this.ajaxRequestQueue = [];

    // limits for number of requests
    this.ajaxMaxRequests = 6;
    this.ajaxMaxRequests = window.maxConnectionsPerServer == undefined ? this.ajaxMaxRequests : window.maxConnectionsPerServer

    // default 10 second timeout
    this.ajaxTimeout = 1000 * 155

    // future cache object
    this.cache = []

    // build and send request 
    this.postRequest = function (url, callbackFunction, request, sContainerDiv) {
        var response;

        // potentially queue request
        if (this.ajaxCurrentRequestCount >= this.ajaxMaxRequests) {
            var requestToQueue = {
                "request": request,
                "callback": callbackFunction,
                "container": sContainerDiv,
                "url": url
            };
            this.ajaxRequestQueue.push(requestToQueue);
            return;
        }
        this.ajaxCurrentRequestCount++;

        // build request
        var ajaxRequest = $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: request,
            dataType: "json",
            // called before sending request, keep track of timeout
            beforeSend: function (jqXHR, settings) {
                this.startTime = new Date();
                $.startTimes[$.startTimes.length] = this.startTime;
                setTimeout(function () {
                    jqXHR.abort("timeout");
                }, window.RequestBuilder.ajaxTimeout);
            },
            // called after error/success functions of each request, dequeue next request here and post
            complete: function (jqXHR, settings) {
                window.RequestBuilder.ajaxCurrentRequestCount--;
                if (window.RequestBuilder.ajaxRequestQueue && window.RequestBuilder.ajaxRequestQueue.length > 0) {
                    var dequeuedRequest = window.RequestBuilder.ajaxRequestQueue.shift();
                    window.RequestBuilder.postRequest(dequeuedRequest.url, dequeuedRequest.callback, dequeuedRequest.request, dequeuedRequest.container);
                }
            },
            // build and return response object
            success: function (msg) {
                this.endTime = new Date();
                try {
                    response = {
                        "text": "",
                        "result": msg.d
                    };
                } catch (e) {
                    response = {
                        "text": msg,
                        "errorText": e,
                        "result": null
                    };
                }
                response.query = window.RequestBuilder.isLive ? $.parseJSON(request) : request;
                response.totaltime = this.endTime - this.startTime;
                response.responseheaders = ajaxRequest.getAllResponseHeaders();
                callbackFunction(response);
            },
            // error fetching response, process and return
            error: function (jqXHR, textStatus, errorThrown) {
                this.endTime = new Date();
                try {
                    response = {
                        "text": errorThrown,
                        "result": textStatus
                    };
                } catch (e) {
                    response = {
                        "text": "",
                        "errorText": e,
                        "result": null
                    };
                }
                response.totaltime = this.endTime - this.startTime;
                response.responseheaders = ajaxRequest.getAllResponseHeaders();
                callbackFunction(response);
            }
        });
    }
}