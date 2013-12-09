"use strict";

// encapsulates calls to create and post ajax requests to echo nest web service
function EchoRequestBuilder() {
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
        $.ajax({
            url: "http://developer.echonest.com/api/v4/artist/search",
            dataType: "jsonp",
            data: {
                results: 12,
                api_key: "YCCWMXIPWV1SIY5OV",
                format: "jsonp",
                name: "radio"
            },
            success: function (data) {
                callbackFunction(data);
            }
        });
    }
}