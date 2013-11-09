window.angular.module('ngff.controllers.eventinstances', [])
  .controller('EventinstancesController', ['$scope','flash','$rootScope','$routeParams','$location','Global','Teams', 'Events','Eventinstances','SharedEvent','SharedEventinstant',
    function ($scope,flash,$rootScope, $routeParams, $location, Global, Teams, Events, Eventinstances, SharedEvent,SharedEventinstant) {
      $scope.global = Global;

        //These functions are uses in cross controller communication
        //They ensure that changes to the Event properties propagate via
        //a service defined in the Global service
        $scope.closeevent = function() {
            //Little bit of jquery to reset the dropdown :)
            $('#eventselector').val(0);
            SharedEvent.prepForBroadcast('');
        };

        $scope.$on('handleBroadcast', function(){
            $scope.selectedEvent = SharedEvent.selectedEvent;
        })

        $scope.$on('closeEvent', function(){
            $scope.selectedEvent = '';
        })

        $scope.getEvent = function(eventId){
            return function(eventinstance) {
                return eventinstance.event._id == eventId;
            }
        }

        $scope.populateEvents = function(query) {
            Events.query(query, function (events) {

                $scope.events = events;
                myPlayers.getPlayers().then(function (data) {
                    $scope.playerlist2 = data.data;

                });
            });
        };

      $scope.create = function () {
        //Get list of Events that the user can select

        var eventinstance = new Eventinstances({
            startdate: new Date(this.eventinstance.startdate)
        });

        eventinstance.$save(function (response) {
          flash.success('Event instance created!');
          $location.path("events/");
        });

        //this.eventinstance.startdate = "";
      };


      $scope.find = function (query) {
        Eventinstances.query(query, function (eventinstances) {
          $scope.eventinstances = eventinstances;


        });
      };

     	$scope.findOne = function () {
            getFullPlayerList(function(result){
                $scope.eventlist =  result.data;
            });
            Eventinstances.get({ eventinstanceId: $routeParams.eventinstanceId }, function (eventinstance) {
    	    $scope.eventinstance = eventinstance;
    	  });
    	}; 

    	$scope.update = function () {
    	  var eventinstance = $scope.eventinstance;
    	  eventinstance.$update(function () {
    	    $location.path('eventinstances/' + eventinstance._id);
    	  });
    	};

    	$scope.remove = function (eventinstance) {
    	  eventinstance.$remove();
    	  for (var i in $scope.eventinstances) {
    	    if ($scope.eventinstances[i] == eventinstance) {
    	      $scope.eventinstances.splice(i, 1)
    	    }
    	  }
    	};

    }]);