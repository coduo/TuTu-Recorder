'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('RequestConfig', [function() {
        function RequestConfig() {
            this.name = 'request_config_name';
            this.request = {
                path: '/example-path',
                    methods: [],
                    query: [],
                    request: [],
                    headers: [],
                    body: ''
            };
            this.response = {
                content: '',
                    status: 200,
                    headers: []
            };
        }

        RequestConfig.prototype = {
            name: 'request_config_name',
            request: {
                path: '/example-path',
                methods: [],
                query: [],
                request: [],
                headers: [],
                body: ''
            },
            response: {
                content: '',
                status: 200,
                headers: []
            }
        };

        RequestConfig.prototype.populateRequest = function(request) {
            this.name = this.escapeName(request.getUrl());
            this.request.path = request.getUrl();
            this.request.methods = [request.method];
            this.request.headers = request.headers;
            this.request.body = request.body;
            if (request.hasMethod('GET')) {
                this.request.query = request.parameters;
            } else {
                this.request.request = request.parameters;
            }
        };

        RequestConfig.prototype.populateResponse = function(response) {
            this.response.status = response.status;
            this.response.content = response.body;
            this.response.headers = response.headers;
        };

        RequestConfig.prototype.escapeName = function(name) {
            var replaceMap = [
                    {search: 'http:\/\/', replace: ''},
                    {search: 'https:\/\/', replace: ''},
                    {search: 'php', replace: ''},
                    {search: '\\.', replace: '_'},
                    {search: '\\/', replace: '_'},
                    {search: '\\?', replace: '_'},
                    {search: '&', replace: '_'},
                    {search: '-', replace: '_'},
                    {search: '#', replace: '_'},
                    {search: ':', replace: '_'}
                ],
                escapedName = name;

            for (var i = 0; i < replaceMap.length; i++) {
                escapedName = escapedName.replace(
                    new RegExp('(' + replaceMap[i].search + ')', 'g'), replaceMap[i].replace
                );
            }

            return escapedName;
        };

        return RequestConfig;
    }]);
})();
