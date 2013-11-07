window.angular.module('ngff.controllers.header', [])
	.controller('HeaderController', ['$scope','Global','$location',
		function ($scope, Global, $location) {
			$scope.global = Global;

                $scope.isActive = function (viewLocation) {
                    //Sets the navigation bar buttons
                    var temp = $location.$$path;
                    return viewLocation === temp;
                };

				$scope.navbarEntries = [
			  {
			    "title": "Events",
			    "link": "events"
			  },
//                {
//                    "title": "Event instances",
//                    "link": "eventinstances"
//                },
			  {
			    "title": "Teams",
			    "link": "teams"
			  },
			  {
			    "title": "Players",
			    "link": "players"
              }
//			  ,
//                {
//                    "title": "Locations",
//                    "link": "locations"
//                }

			];
		}]);