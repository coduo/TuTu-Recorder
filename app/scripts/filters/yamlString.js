'use strict';

(function() {

    var module = angular.module('tuTuRecorderApp');

    module.filter('yamlString', [function() {
        return function (string, indentionSize) {
            indentionSize = indentionSize || 0;
            var indention = new Array(indentionSize).join(' '),
                result = '| \n',
                stringLines = string.split('\n'),
                i = 0;

            if (!string.length) {
                return '""' ;
            }

            if (stringLines.length === 1) {
                return string;
            }

            for (i = 0; i < stringLines.length; i++) {
                result += indention + stringLines[i] + '\n';
            }

            result += indention;

            return result;
        };
    }]);
})();
