window.angular.module('ngff.controllers.events', [])
  .controller('EventsController', ['$scope','$rootScope','$routeParams','$location','Global','Events','Teams','Eventinstances','SharedEvent','SharedEventinstant',
    function ($scope, $rootScope, $routeParams, $location, Global, Events, Teams, Eventinstances, SharedEvent, SharedEventinstant) {
      $scope.global = Global;


        //These functions are uses in cross controller communication
        //They ensure that changes to the Event properties propagate via
        //a service defined in the Global service
        $scope.selectAction = function(value) {
            //Call the shared event service
            SharedEvent.prepForBroadcast(value);
        };

        $scope.$on('handleBroadcast', function(){
            $scope.selectedEvent = SharedEvent.selectedEvent;
        })

        $scope.populateTeams = function(query) {
            Teams.query(query, function (teams) {
                $scope.teams = teams;
            });
        };

        //Define some constance as found in the /const.js file
        $scope.days = consts.getDays();
        $scope.times = consts.getEveningTimes();
        $scope.morningtimes = consts.getMorningTimes();
        $scope.recurrings = consts.getRecurringOptions();

      $scope.create = function () {
        var event = new Events({
          name: this.event.name,
          day: this.event.day,
          location: this.event.location,
          maxAttendance: this.event.maxAttendance,
          minAttendance: this.event.minAttendance,
          time: this.event.time,
          startdate: new Date(this.event.startdate),
          enddate: new Date(this.event.enddate),
          recurring: this.event.recurring,
          notificationtime: this.event.notificationtime,
          reminderstime: this.event.reminderstime,
          team: this.event.team
        });

        event.$save(function (response) {
          $location.path("events/" + response._id);
        });
        this.event.name = "";
      };

      $scope.find = function (query) {
        Events.query(query, function (events) {
          //events.startdate = new Date(events.startdate);
          $scope.events = events;

        });
      };

     	 $scope.findOne = function () {
    	  Events.get({ eventId: $routeParams.eventId }, function (event) {
              event.startdate = new Date(event.startdate);
              event.enddate = new Date(event.enddate);
              $scope.event = event;
    	  });
    	}; 

    	$scope.update = function () {
    	  var event = $scope.event;
    	  event.$update(function () {
    	    $location.path('events/' + event._id);
    	  });
    	};

    	$scope.remove = function (event) {
    	  event.$remove();
    	  for (var i in $scope.events) {
    	    if ($scope.events[i] == event) {
    	      $scope.events.splice(i, 1)
    	    }
    	  }
    	};
    }]);
