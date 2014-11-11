'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('Storage', [function() {
        var currentConfig = null;

        function Storage() {
            currentConfig = null;
        }

        Storage.prototype = {
            setCurrentConfig : function(requestConfig) {
                currentConfig = requestConfig;
            },
            hasCurrentConfig : function() {
                return currentConfig !== null;
            },
            removeCurrentConfig : function() {
                currentConfig = null;
            },
            getCurrentConfig: function() {
                return currentConfig;
            }
        };

        return new Storage();
    }]);
})();
