(function(window, angular, undefined) {
    'use strict';

    var module = angular.module('app', [
        'ui.router',
        'app.controllers',
        'angular-vumeter',
        'hljs'
    ]);

    module.config(function($stateProvider) {
        $stateProvider.state({
            name: 'home',
            url: '/',
            templateUrl: window.config.templatePath + 'home.tpl.html',
            controller: 'MainCtrl'
        });
    });

    module.config(function($urlRouterProvider){
        // when there is an empty route, redirect to /index
        $urlRouterProvider.when('', '/');
    })

    // Enable/disable angular debug data (ng-scope, ng-binding, etc)
    module.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);

})(window, window.angular);