window.angular.module('ngff.services.global', [])
    .factory('SharedEvent', function($rootScope){
        sharedEvent = {};

        sharedEvent.selectedEvent =  '';

        sharedEvent.prepForBroadcast = function(val){
            this.selectedEvent = val;
            this.broadcastItem();
        }
        sharedEvent.broadcastItem = function(){
            $rootScope.$broadcast('handleBroadcast');
        }
        return sharedEvent;
    })
    .factory('SharedEventinstant', function($rootScope){
        sharedEventinstant = {};

        sharedEventinstant.selectedEventinstance =  '';

        sharedEventinstant.prepForBroadcast = function(val){
            this.selectedEventinstance = val;
            this.broadcastItem();
        }
        sharedEventinstant.broadcastItem = function(){
            $rootScope.$broadcast('handleBroadcast');
        }
        return sharedEventinstant;
    })
  .factory('Global', function(){
  	var current_user = window.user;

  	return {
  		currentUser: function() {
  			return current_user;
  		},
  		isSignedIn: function() {
  			return !!current_user;
  		}
  	};
  });