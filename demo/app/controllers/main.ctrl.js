(function(window, angular, undefined) {
    'use strict';

    var module = angular.module('app');

    var MainCtrl = function($scope) {
        $scope.supportedBrowser = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    };

    MainCtrl.$inject = ['$scope'];
    module.controller('MainCtrl', MainCtrl);

})(window, window.angular);
