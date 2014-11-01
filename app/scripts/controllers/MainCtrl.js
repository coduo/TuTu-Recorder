(function() {

    var module = angular.module('tuTuRecorderApp');

    module.controller('MainCtrl', [
        '$scope', '$location', 'ConfigRepository', 'RequestConfig',
        function ($scope, $location, ConfigRepository, RequestConfig) {
            $scope.requestConfigs = ConfigRepository;

            $scope.addNewConfig = function() {
                $location.path('/new');
            };

            $scope.remove = function(index) {
                this.requestConfigs.remove(index);
            };

            $scope.download = function() {
                alert("Sorry, this feature is not ready.");
                //var blob = new Blob(["Config string"], {type: "text/plain;charset=utf-8"});
                //saveAs(blob, "hello world.txt");
            };
    }]);
})();
