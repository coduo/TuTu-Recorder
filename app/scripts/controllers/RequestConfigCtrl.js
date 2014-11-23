'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('RequestConfigCtrl',
        ['$scope', 'ConfigRepository', 'RequestConfig', '$location', 'Storage', '$modal',
        function($scope, ConfigRepository, RequestConfig, $location, Storage, $modal) {
            $scope.requestConfig = Storage.hasCurrentConfig() ? Storage.getCurrentConfig()
                : new RequestConfig();

            $scope.allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'HEAD', 'DELETE', 'TRACE', 'CONNECT'];

            $scope.addRequestParam = function(param) {
                this.requestConfig.request[param].push({
                    key: 'key',
                    value : 'value'
                });
            };

            $scope.removeRequestParam = function(param, index) {
                this.requestConfig.request[param].splice(index, 1);
            };

            $scope.addResponseParam = function(param) {
                this.requestConfig.response[param].push({
                    key: 'key',
                    value : 'value'
                });
            };
            $scope.removeResponseParam = function(param, index) {
                this.requestConfig.response[param].splice(index, 1);
            };

            $scope.resetConfig = function() {
                $scope.requestConfig = {
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
            };

            $scope.saveConfig = function(requestConfig) {
                if (ConfigRepository.addNewRequestConfig(requestConfig)) {
                    Storage.removeCurrentConfig();
                    console.log(Storage.getCurrentConfig());
                    this.resetConfig();
                    $location.path('/');
                } else {
                    $modal.open({
                        templateUrl: 'requestConfigErrorModalContent.html',
                        controller: 'RequestConfigErrorModalCtrl',
                        resolve: {
                            error: function () {
                                return ConfigRepository.getLastError();
                            }
                        }
                    });

                    ConfigRepository.clearLastError();
                }
            };

            $scope.back = function() {
                $location.path('/');
            };
        }
    ]);

    module.controller('RequestConfigErrorModalCtrl', [
        '$scope', '$modalInstance', 'error',
        function ($scope, $modalInstance, message) {
            $scope.error = {
                message : message
            };

            $scope.close = function () {
                $modalInstance.close();
            };
        }]
    );
})();
