(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('RequestConfigCtrl',
        ['$scope', 'ConfigRepository', 'RequestConfig', '$location',
        function($scope, ConfigRepository, RequestConfig, $location) {
            $scope.clean = new RequestConfig();
            $scope.requestConfig = new RequestConfig();
            $scope.allowedMethods = ["POST", "GET", "PUT", "PATCH", "OPTIONS", "HEAD", "DELETE", "TRACE", "CONNECT"];

            $scope.addRequestParam = function(param) {
                this.requestConfig.request[param].push({
                    key: "key",
                    value :"value"
                });
            };
            $scope.removeRequestParam = function(param, index) {
                this.requestConfig.request[param].splice(index, 1);
            };

            $scope.addResponseParam = function(param) {
                this.requestConfig.response[param].push({
                    key: "key",
                    value :"value"
                });
            };
            $scope.removeResponseParam = function(param, index) {
                this.requestConfig.response[param].splice(index, 1);
            };

            $scope.resetConfig = function() {
                $scope.requestConfig = angular.copy($scope.clean);
            };

            $scope.saveConfig = function(requestConfig) {
                ConfigRepository.addNewRequestConfig(requestConfig);
                $location.path('/');
            };

            $scope.back = function() {
                $location.path('/');
            };

            $scope.resetConfig();
        }]);

})();
