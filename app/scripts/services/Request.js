'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('Request', [function() {
        function Request() {
            this.url = null;
            this.method = 'GET';
            this.parameters = [];
            this.headers = [];
            this.body = '';
        }

        Request.prototype = {
            url: null,
            method: 'GET',
            parameters: [],
            headers: [],
            body: ''
        };

        Request.prototype.getUrl = function() {
            var reg = /^((http|https|ftp):\/\/)/;

            if (this.url === null) {
                return this.url;
            }

            if (!reg.test(this.url)) {
                return 'http://' + this.url;
            }

            return this.url;
        };

        Request.prototype.toJson = function() {
            return {
                url: this.getUrl(),
                method: this.method,
                headers: this.headers,
                parameters: this.parameters,
                body: this.body
            };
        };

        Request.prototype.hasMethod = function(method) {
            return this.method === method;
        };

        return Request;
    }]);
})();
