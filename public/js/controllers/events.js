window.angular.module('ngff.controllers.events', [])
  .controller('EventsController', ['$scope','$rootScope','$routeParams','$location','Global','Events','Teams','Eventinstances','SharedEvent',
    function ($scope, $rootScope, $routeParams, $location, Global, Events, Teams, Eventinstances, SharedEvent) {
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
            Teams.query(query, function (teams) {
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
            {timeId : 0, timeName : '17:00' },
            {timeId : 1, timeName : '17:15' },
            {timeId : 2, timeName : '17:30' },
            {timeId : 3, timeName : '17:45' },
            {timeId : 4, timeName : '18:00' },
            {timeId : 5, timeName : '18:15' },
            {timeId : 6, timeName : '18:30' },
            {timeId : 7, timeName : '18:45' },
            {timeId : 8, timeName : '19:00' },
            {timeId : 9, timeName : '19:15' },
            {timeId : 10, timeName : '19:30' },
            {timeId : 11, timeName : '19:45' },
            {timeId : 12, timeName : '20:00' },
            {timeId : 13, timeName : '20:15' },
            {timeId : 14, timeName : '20:30' },
            {timeId : 15, timeName : '20:45' },
            {timeId : 16, timeName : '21:00' },
            {timeId : 17, timeName : '21:15' },
            {timeId : 18, timeName : '21:30' },
            {timeId : 19, timeName : '21:45' },
            {timeId : 20, timeName : '22:00' },
            {timeId : 21, timeName : '22:15' },
            {timeId : 22, timeName : '22:30' },
            {timeId : 23, timeName : '22:45' },
            {timeId : 24, timeName : '23:00' },
            {timeId : 25, timeName : '23:15' },
            {timeId : 26, timeName : '23:30' },
            {timeId : 27, timeName : '23:45' },
            {timeId : 28, timeName : '00:00' }
        ];

        $scope.morningtimes = [
            {timeId : 0, timeName : '07:00' },
            {timeId : 1, timeName : '07:15' },
            {timeId : 2, timeName : '07:30' },
            {timeId : 3, timeName : '07:45' },
            {timeId : 4, timeName : '08:00' },
            {timeId : 5, timeName : '08:15' },
            {timeId : 6, timeName : '08:30' },
            {timeId : 7, timeName : '08:45' },
            {timeId : 8, timeName : '09:00' },
            {timeId : 9, timeName : '09:15' },
            {timeId : 10, timeName : '09:30' },
            {timeId : 11, timeName : '09:45' },
            {timeId : 12, timeName : '10:00' },
            {timeId : 13, timeName : '10:15' },
            {timeId : 14, timeName : '10:30' },
            {timeId : 15, timeName : '10:45' },
            {timeId : 16, timeName : '11:00' },
            {timeId : 17, timeName : '11:15' },
            {timeId : 18, timeName : '11:30' },
            {timeId : 19, timeName : '11:45' },
            {timeId : 20, timeName : '12:00' },
            {timeId : 21, timeName : '12:15' },
            {timeId : 22, timeName : '12:30' },
            {timeId : 23, timeName : '12:45' },
            {timeId : 24, timeName : '13:00' },
            {timeId : 25, timeName : '13:15' },
            {timeId : 26, timeName : '13:30' },
            {timeId : 27, timeName : '13:45' },
            {timeId : 28, timeName : '14:00' }
        ];


        $scope.recurrings = [
            {recurringId: 0, recurringName:'Not recurring'},
            {recurringId: 1,recurringName:'Weekly'}
//            {recurringId: 2,recurringName:'Monthly'}
        ]

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
            //$rootScope.selectedEvent = {'data':'52792bc5da66d8360e000006'};
            //$scope.selectedEvent =  SharedEvent.selectedEvent;
            debugger;

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
