(function() {

    var module = angular.module('tuTuRecorderApp');

    module.factory('RequestConfig', [function() {
        function RequestConfig() {}

        RequestConfig.prototype = {
            name: "request_config_name",
            request: {
                path: "/example-path",
                methods: [],
                query: [],
                request: [],
                headers: [],
                body: ""
            },
            response: {
                content: "",
                status: 200,
                headers: []
            }
        };

        return RequestConfig;
    }]);
})();
