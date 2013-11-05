window.angular.module('ngff.controllers.header', [])
	.controller('HeaderController', ['$scope', 'Global',
		function ($scope, Global) {
			$scope.global = Global;

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