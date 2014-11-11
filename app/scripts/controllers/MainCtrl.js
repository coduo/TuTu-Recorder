'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('MainCtrl', [
        '$scope', '$location', 'ConfigRepository',
        function ($scope, $location, ConfigRepository) {
            $scope.requestConfigs = ConfigRepository;

            $scope.addNewConfig = function() {
                $location.path('/config');
            };

            $scope.remove = function(index) {
                this.requestConfigs.remove(index);
            };

            $scope.download = function() {
                //alert('Sorry, this feature is not ready.');
                //var blob = new Blob(["Config string"], {type: "text/plain;charset=utf-8"});
                //saveAs(blob, "hello world.txt");
            };
        }
    ]);
})();
