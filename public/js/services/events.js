window.angular.module('ngff.services.events', [])
    .factory('myEvents', function($http) {
        return {
            getEvents: function() {
                var promise = $http({
                    url: 'http://localhost:3000/events',
                    method: "GET"
                }).success(function (data) {
                        return data;
                    });
                return promise;
            }
        }
    })
    .factory('Events', ['$resource',
    function($resource){
      return $resource(
        'events/:eventId',
        {
          eventId:'@_id'
        },
        {
          update: {method: 'PUT'}
        }
      )
    }]);