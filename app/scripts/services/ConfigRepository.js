(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('ConfigRepository', [function() {
        var configs = [];

        function ConfigRepository() {
            configs = [];
        }

        ConfigRepository.prototype = {
            addNewRequestConfig : function(config) {
                configs.push(config);
            },
            all : function() {
                return configs;
            },
            remove: function(index) {
                configs.splice(index, 1);
            }
        };

        return new ConfigRepository();
    }]);
})();
