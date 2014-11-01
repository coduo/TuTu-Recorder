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
    'checklist-model'
  ])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/new' , {
            templateUrl: 'views/requestConfig.html',
            controller: 'RequestConfigCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
