'use strict';

/**
 * @ngdoc overview
 * @name tuTuRecorderApp
 * @description
 * # tuTuRecorderApp
 *
 * Main module of the application.
 */
angular
  .module('tuTuRecorderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'checklist-model',
    'ui.bootstrap'
  ])
.config(function ($routeProvider, $provide) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/main.html',
            controller: 'MainCtrl'
        })
        .when('/config' , {
            templateUrl: '../views/requestConfig.html',
            controller: 'RequestConfigCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
