'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('RequestCtrl', [
        '$scope', 'Request', 'RequestConfig', '$http', '$location', '$modal', 'Storage',
        function ($scope, Request, RequestConfig, $http, $location, $modal, Storage) {
            $scope.request = new Request();
            $scope.allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'HEAD', 'DELETE', 'TRACE', 'CONNECT'];

            $scope.addRequestParam = function(param) {
                $scope.request[param].push({
                    key: 'key',
                    value : 'value'
                });
            };

            $scope.removeRequestParam = function(param, index) {
                $scope.request[param].splice(index, 1);
            };

            $scope.send = function(request) {
                var requestConfig = new RequestConfig();
                var loadingResponseModal = $modal.open({
                    templateUrl: 'loadingResponseModalContent.html',
                    controller: 'loadingResponseModalCtrl',
                    resolve: {
                        request: function () {
                            return request;
                        }
                    }
                });

                requestConfig.populateRequest(request);

                $http.post('proxy.php', request.toJson())
                    .success(function(data) {
                        loadingResponseModal.close();
                        requestConfig.populateResponse(data);
                        Storage.setCurrentConfig(requestConfig);
                        $location.path('/config');
                    }).
                    error(function(data) {
                        loadingResponseModal.close();
                        $modal.open({
                            templateUrl: 'exceptionModalContent.html',
                            controller: 'ExceptionModalCtrl',
                            resolve: {
                                error: function () {
                                    return data;
                                }
                            }
                        });
                    });
            };
        }
    ]);

    module.controller('ExceptionModalCtrl', [
        '$scope', '$modalInstance', 'error',
        function ($scope, $modalInstance, error) {
            $scope.error = error;

            $scope.close = function () {
                $modalInstance.close();
            };
        }]
    );

    module.controller('loadingResponseModalCtrl', [
        '$scope', '$modalInstance', 'request',
        function ($scope, $modalInstance, request) {
            $scope.request = request;
        }]
    );
})();
