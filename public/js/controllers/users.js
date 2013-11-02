window.angular.module('ngff.controllers.users', [])
  .controller('UsersController', ['$scope','$routeParams','$location','Global','Users','Teams',
    function ($scope, $routeParams, $location, Global, Users, Teams) {
      $scope.global = Global;

      $scope.find = function (query) {
        Users.query(query, function (users) {
          $scope.users = users;

        });
      };

     	$scope.findUser = function () {
            debugger;
    	    tempuser = $scope.global.currentUser();
            Users.get({ userId: tempuser._id }, function (user) {
                $scope.user = user;
            });
    	}; 

    	$scope.update = function () {
            debugger;
    	  var user = $scope.user;
    	  user.$update(function () {
              Users.get({ userId: tempuser._id }, function (user) {
                  $scope.user = user;
              });
    	    $location.path('users/profile');
    	  });
    	};

    }]);