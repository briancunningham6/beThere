window.angular.module('ngff.controllers.index', [])
  .controller('IndexController', ['$scope','flash',
    function ($scope,flash){
        flash.success = 'Do it live!';
    }]);
