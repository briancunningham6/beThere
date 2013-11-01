window.angular.module('ngff.services.eventinstances', [])
  .factory('Eventinstances', ['$resource',
    function($resource){
      return $resource(
        'eventinstances/:eventinstanceId',
        {
          eventinstancesId:'@_id'
        },
        {
          update: {method: 'PUT'}
        }
      )
    }]);