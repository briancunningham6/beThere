window.angular.module('ngff.services.global', [])
    .factory('SharedEvent', function($rootScope){
        sharedEvent = {};

        sharedEvent.selectedEvent =  '';
        sharedEvent.selectedInstanceEvent =  '';
        sharedEvent.selectedEventObject = [];
        sharedEvent.selectedEventInstanceObject = [];

        sharedEvent.prepForBroadcast = function(eventInstanceId,eventId,selectedEventObject){
            this.selectedInstanceEvent = eventInstanceId;
            this.selectedEvent = eventId;
            this.selectedEventObject = selectedEventObject;
            this.broadcastItem();
        }
        sharedEvent.broadcastItem = function(){
            $rootScope.$broadcast('handleBroadcast');
        }
        return sharedEvent;
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