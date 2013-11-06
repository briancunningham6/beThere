window.angular.module('ngff.controllers.eventinstances', [])
  .controller('EventinstancesController', ['$scope','$rootScope','$routeParams','$location','Global','Teams', 'Eventinstances','SharedEvent',
    function ($scope, $rootScope, $routeParams, $location, Global, Teams, Eventinstances, SharedEvent) {
      $scope.global = Global;

        $scope.selectedEvent = "";

        $scope.selectAction = function(value) {
            //Call the shared event service
            //debugger;
            //$rootScope.sharedEvent = value;

            //haredEvent.prepForBroadcast(value);
        };


        $scope.$on('handleBroadcast', function(){
            $scope.selectedEvent = SharedEvent.selectedEvent;
        })

        $scope.getEvent = function(eventId){
            debugger;
            return function(eventinstance) {
                return eventinstance.event._id == eventId;
            }
        }

      $scope.create = function () {
        var eventinstance = new Eventinstances({
            startdate: new Date(this.eventinstance.startdate)
        });

        eventinstance.$save(function (response) {
          $location.path("eventinstances/" + response._id);
        });

        //this.eventinstance.startdate = "";
      };


      $scope.find = function (query) {
        Eventinstances.query(query, function (eventinstances) {
          $scope.eventinstances = eventinstances;
          $rootScope.selectedEvent = {'data':'52792bc5da66d8360e000006'};


        });
      };

     	$scope.findOne = function () {
            debugger;
            Eventinstances.get({ eventinstanceId: $routeParams.eventinstanceId }, function (eventinstance) {
    	    $scope.eventinstance = eventinstance;
    	  });
    	}; 

    	$scope.update = function () {
            debugger;
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