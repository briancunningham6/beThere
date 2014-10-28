window.angular.module('ngff.controllers.messages', [])
  .controller('MessagesController', ['$scope','$routeParams','$location','Global','Messages','Teams','SharedEvent',
    function ($scope, $routeParams, $location, Global, Messages, Teams, SharedEvent) {
      $scope.global = Global;

        $scope.selectAction = function(value) {
            //Call the shared event service
            SharedEvent.prepForBroadcast(value);
        };

        $scope.$on('handleBroadcast', function(){
            debugger;
            $scope.selectedEvent = SharedEvent.selectedEvent;
        })


        $scope.populateTeams = function(query) {
            FantasyTeams.query(query, function (teams) {
                $scope.teams = teams;
            });
        };

      $scope.create = function () {
        var message = new Messages({
          name: this.message.name,
          day: this.message.day,
          location: this.message.location,
          maxAttendance: this.message.maxAttendance,
          minAttendance: this.message.minAttendance,
          time: this.message.time,
          notificationTime: this.message.notificationTime,
          team: this.message.team
        });

        message.$save(function (response) {
          $location.path("messages/" + response._id);
        });

        this.message.name = "";
      };

      $scope.find = function (query) {
        Messages.query(query, function (messages) {
            debugger;
          $scope.messages = messages;

        });
      };

     	$scope.findOne = function () {
    	  Messages.get({ messageId: $routeParams.messageId }, function (message) {
    	    $scope.message = message;
    	  });
    	}; 

    	$scope.update = function () {
    	  var message = $scope.message;
    	  message.$update(function () {
    	    $location.path('messages/' + message._id);
    	  });
    	};

        //Manually confirm the attendance of the player by a user
        $scope.confirm = function () {
            var message = $scope.message;
            message.$update(function () {
                $location.path('messages/confirm' + message._id);
            });
        };


    	$scope.remove = function (message) {
    	  message.$remove();
    	  for (var i in $scope.messages) {
    	    if ($scope.messages[i] == message) {
    	      $scope.messages.splice(i, 1)
    	    }
    	  }
    	};
    }]);