(function() {

    var module = angular.module('tuTuRecorderApp');

    module.directive('requestConfig', [function() {
        return {
            restrict: 'EA',
            scope: {
                config: '=config'
            },
            templateUrl: '../../../views/directives/config/requestConfig.yml'
        };
    }]);
})();
