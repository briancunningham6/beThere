window.angular.module('ngff.controllers.events', [])
  .controller('EventsController', ['$scope','flash','$rootScope','$routeParams','$location','Global','Events','Teams','Eventinstances','SharedEvent',
    function ($scope, flash, $rootScope, $routeParams, $location, Global, Events, Teams, Eventinstances, SharedEvent) {
      $scope.global = Global;


        //These functions are uses in cross controller communication
        //They ensure that changes to the Event properties propagate via
        //a service defined in the Global service

        $scope.closeevent = function() {
            SharedEvent.prepForBroadcast('');
        };

        $scope.selectAction = function(value) {
            //Call the shared event service
            result = value.split(',');
            eventinstanceId = result[0];
            eventId = result[1];
            //Look through the Events for an event with the given event ID
            selectedEventObject = [];
            debugger;
            $scope.events.forEach(function(event){
                debugger;
              if(event._id == eventId)  {
                  selectedEventObject = event;
              }
            })
            SharedEvent.prepForBroadcast(result[0],result[1],selectedEventObject);
        };

        $scope.$on('handleBroadcast', function(){
            $scope.selectedEvent = SharedEvent.selectedEvent;
            $scope.selectedInstanceEvent = SharedEvent.selectedInstanceEvent;
            $scope.selectedEventObject = $scope.selectedEventObject;

        })

        $scope.$on('closeEvent', function(){
            $scope.selectedEvent = '';
            $scope.selectedInstanceEvent = '';
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

        $scope.updateMessage = function(){
            $scope.event.displayTime = consts.getEveningTimeFromIndex($scope.event.time);
            $scope.event.message = "Hi," + $scope.event.name + " today in " + $scope.event.location + " at " + $scope.event.displayTime + ". Reply with '"+ $scope.event.confirmword + "' to join or '"+$scope.event.declineword+"' if you cant come. Thanks";
        }

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
          disabled: this.event.disabled,
          message: this.event.message,
          reminderstime: this.event.reminderstime,
          team: this.event.team,
          confirmword: this.event.confirmword,
          declineword: this.event.declineword
        });

        event.$save(function (response) {
            debugger;
          //$location.path("events/" + response._id);
            if(response.message == 'Validation failed'){
                flash.error = 'Validation failed, please review your data';

            }
            else{
                flash.success = 'Event created....!';
                $location.path("events/");
            }
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
          flash.error = 'Event has been deleted!';
    	};
    }]);
