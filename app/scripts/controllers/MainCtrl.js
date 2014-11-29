'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('MainCtrl', [
        '$rootScope', '$scope', '$location', 'ConfigRepository',
        function ($rootScope, $scope, $location, ConfigRepository) {
            $scope.requestConfigs = ConfigRepository;

            $scope.addNewConfig = function() {
                $location.path('/config');
            };

            $scope.remove = function(index) {
                this.requestConfigs.remove(index);
            };

            $scope.download = function() {
                var configs = angular.element(document.querySelectorAll("request-config")),
                    i = 0,
                    configStr = '';

                for (i; i < configs.length; i++) {
                    configStr += angular.element(configs[i]).text() + "\n";
                }

                var blob = new Blob([configStr], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "responses.yml");
            };
        }
    ]);
})();
