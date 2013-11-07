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

        $scope.showphone = function () {
            tempuser = $scope.global.currentUser();
            Users.get({ userId: tempuser._id }, function (user) {
                $scope.user = user;
            });
        };

        $scope.verifycode = function () {
            var user = $scope.user;
            if($scope.code == $scope.user.phoneverificationcode){
                user.phoneverified = true;
                user.$update(function () {
                    Users.get({ userId: tempuser._id }, function (user) {
                        $scope.user = user;
                    });
                    $location.path('users/profile');
                })
            }
        };

        $scope.changephone = function () {
            tempuser = $scope.global.currentUser();
            Users.get({ userId: tempuser._id }, function (user) {
                $scope.user = user;
            });
        };

        $scope.updatephone = function () {
            var user = $scope.user;

            user.phoneverified = false;
            //TODO: generate new verification code and send SMS

            user.$update(function () {
                Users.get({ userId: tempuser._id }, function (user) {
                    $scope.user = user;
                });
                $location.path('users/profile');
            })

        };

        $scope.update = function () {
    	  var user = $scope.user;
    	  user.$update(function () {
              Users.get({ userId: tempuser._id }, function (user) {
                  $scope.user = user;
              });
    	    $location.path('users/profile');
    	  });
    	};

    }]);