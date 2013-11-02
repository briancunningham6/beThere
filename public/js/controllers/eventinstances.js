window.angular.module('ngff.controllers.eventinstances', [])
  .controller('EventinstancesController', ['$scope','$routeParams','$location','Global','Teams', 'Eventinstances',
    function ($scope, $routeParams, $location, Global, Teams, Eventinstances) {
      $scope.global = Global;

      $scope.create = function () {
          debugger;
        var eventinstance = new Eventinstances({
            startdate: new Date(this.eventinstance.startdate)
        });

        eventinstance.$save(function (response) {
          $location.path("eventinstances/" + response._id);
        });

        //this.eventinstance.startdate = "";
      };

      $scope.find = function (query) {
          debugger;
        Eventinstances.query(query, function (eventinstances) {
          $scope.eventinstances = eventinstances;

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
            debugger;
    	  eventinstance.$remove();
    	  for (var i in $scope.eventinstances) {
    	    if ($scope.eventinstances[i] == eventinstance) {
    	      $scope.eventinstances.splice(i, 1)
    	    }
    	  }
    	};

    }]);