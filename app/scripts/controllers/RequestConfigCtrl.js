'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('RequestConfigCtrl',
        ['$scope', 'ConfigRepository', 'RequestConfig', '$routeParams', '$location', 'Storage', '$modal',
        function($scope, ConfigRepository, RequestConfig, $routeParams, $location, Storage, $modal) {
            var editConfigName = $routeParams.config || null;

            if (editConfigName == null) {
                $scope.requestConfig = Storage.hasCurrentConfig() ? Storage.getCurrentConfig()
                    : new RequestConfig();
            } else {
                if (!ConfigRepository.hasConfigWithName(editConfigName)) {
                    $modal.open({
                        templateUrl: 'requestConfigErrorModalContent.html',
                        controller: 'RequestConfigErrorModalCtrl',
                        resolve: {
                            header: function() { return "Error"; },
                            error: function () {
                                return "Config with name \"" + editConfigName + "\" does not exists.";
                            }
                        }
                    });
                    $scope.requestConfig = new RequestConfig();
                    editConfigName = null;
                } else {
                    $scope.requestConfig = ConfigRepository.getConfigByName(editConfigName);
                }
            }

            $scope.isEdit = editConfigName != null;
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
                var editFunction = (editConfigName == null)
                    ? function(config) {return ConfigRepository.addNewRequestConfig(config);}
                    : function(config) {return ConfigRepository.editRequestConfig(config); };

                if (editFunction(requestConfig)) {
                    Storage.removeCurrentConfig();
                    this.resetConfig();
                    $location.path('/');
                } else {
                    $modal.open({
                        templateUrl: 'requestConfigErrorModalContent.html',
                        controller: 'RequestConfigErrorModalCtrl',
                        resolve: {
                            header: function() { return "Can't add new request config to config repository because: "; },
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
        function ($scope, $modalInstance, header, message) {
            $scope.error = {
                header: header,
                message : message
            };

            $scope.close = function () {
                $modalInstance.close();
            };
        }]
    );
})();
