'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('ConfigRepository', [function() {
        var configs = [],
            lastError = null;

        function ConfigRepository() {
            configs = [];
            lastError = null;
        }

        ConfigRepository.prototype = {
            addNewRequestConfig: function(config) {
                if (this.hasConfigWithName(config.name)) {
                    lastError = 'Config with name "' + config.name + '" already exists.';
                    return false;
                }

                configs.push(config);
                return true;
            },
            all: function() {
                return configs;
            },
            remove: function(index) {
                configs.splice(index, 1);
            },
            hasConfigWithName: function(name) {
                var i = 0;
                for (i; i < configs.length; i++) {
                    if (configs[i].name === name) {
                        return true;
                    }
                }

                return false;
            },
            clearLastError: function() {
                this.lastError = null;
            },
            getLastError: function() {
                return (lastError === null) ? 'There is no error.' : lastError;
            }
        };

        return new ConfigRepository();
    }]);
})();
