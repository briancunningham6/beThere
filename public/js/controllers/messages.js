window.angular.module('ngff.controllers.messages', [])
  .controller('MessagesController', ['$scope','$routeParams','$location','Global','Messages','Teams',
    function ($scope, $routeParams, $location, Global, Messages, Teams) {
      $scope.global = Global;

        $scope.populateTeams = function(query) {
            FantasyTeams.query(query, function (teams) {
                $scope.teams = teams;
            });
        };


        $scope.days = [
            {dayId : 0, dayName : 'Monday' },
            {dayId : 1, dayName : 'Tuesday' },
            {dayId : 2, dayName : 'Wednesday' },
            {dayId : 3, dayName : 'Thursday' },
            {dayId : 4, dayName : 'Friday' },
            {dayId : 5, dayName : 'Saturday' },
            {dayId : 6, dayName : 'Sunday' }
        ];

        $scope.times = [
            {timeId : 0, timeName : '00:00' },
            {timeId : 1, timeName : '00:15' },
            {timeId : 2, timeName : '00:30' },
            {timeId : 3, timeName : '00:45' },
            {timeId : 4, timeName : '01:00' },
            {timeId : 5, timeName : '01:15' },
            {timeId : 6, timeName : '01:30' }
        ];

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

    	$scope.remove = function (message) {
    	  message.$remove();
    	  for (var i in $scope.messages) {
    	    if ($scope.messages[i] == message) {
    	      $scope.messages.splice(i, 1)
    	    }
    	  }
    	};
    }]);