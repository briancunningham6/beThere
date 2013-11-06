window.angular.module('ngff.services.global', [])
    .factory('SharedEvent', function($rootScope){
        debugger;
        sharedEvent = {};

        sharedEvent.selectedEvent =  '52792bc5da66d8360e000006';

        sharedEvent.prepForBroadcast = function(val){
            debugger;
            this.selectedEvent = val;
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