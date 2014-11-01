(function() {

    var module = angular.module('tuTuRecorderApp');

    module.directive('requestConfig', [function() {
        return {
            restrict: 'E',
            scope: {
                config: '=config'
            },
            templateUrl: 'views/directives/config/requestConfig.yml'
        };
    }]);
})();
