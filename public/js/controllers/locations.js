

window.angular.module('ngff.controllers.locations', [])
  .controller('LocationsController', ['$scope','$routeParams','$location','Global','Locations',
    function ($scope, $routeParams, $location, Global, Locations) {
      $scope.global = Global;

        $scope.create = function () {
        var location = new Locations({
          name: this.location.name
        });

        location.$save(function (response) {
          $location.path("locations/" + response._id);
        });

        this.location.name = "";
      };

      $scope.find = function (query) {
        Locations.query(query, function (locations) {
          $scope.locations = locations;
        });
      };

     	$scope.findOne = function () {
    	  Locations.get({ locationId: $routeParams.locationId }, function (location) {
    	    $scope.location = location;
    	  });
    	}; 

    	$scope.update = function () {
    	  var location = $scope.location;
    	  location.$update(function () {
    	    $location.path('locations/' + location._id);
    	  });
    	};

    	$scope.remove = function (location) {
    	  location.$remove();
    	  for (var i in $scope.locations) {
    	    if ($scope.locations[i] == location) {
    	      $scope.locations.splice(i, 1)
    	    }
    	  }
    	};

    }]);