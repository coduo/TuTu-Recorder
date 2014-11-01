(function() {

    var module = angular.module('tuTuRecorderApp');

    module.filter('yamlAssociative', [function() {
        return function (queryParams, indentionSize) {
            indentionSize = indentionSize || 0;
            var indention = Array(indentionSize).join(" "),
                i = 0,
                result = "\n";

            indention = indention || "";

            if (!queryParams.length) {
                return "[]"
            }

            for (i = 0; i < queryParams.length; i++) {
                result += indention + '"' + queryParams[i].key + '"' + ": " + '"' + queryParams[i].value + '"';

                if (i < queryParams.length - 1) {
                    result += "\n";
                }
            }

            return result;
        }
    }]);
})();
