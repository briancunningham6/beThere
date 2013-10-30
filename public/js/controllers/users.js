window.angular.module('ngff.controllers.users', [])
  .controller('UsersController', ['$scope','$routeParams','$location','Global','Users','FantasyTeams',
    function ($scope, $routeParams, $location, Global, Users, FantasyTeams) {
      $scope.global = Global;

      $scope.find = function (query) {
        Users.query(query, function (users) {
          $scope.users = users;

        });
      };

     	$scope.findOne = function () {
    	  Users.get({ eventId: req.user._doc._id}, function (user) {
    	    $scope.user = user;
    	  });
    	}; 

    	$scope.update = function () {
    	  var event = $scope.event;
            debugger;

    	  event.$update(function () {
    	    $location.path('users/' + event._id);
    	  });
    	};

    }]);