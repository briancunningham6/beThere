window.angular.module('ngff.services.messages', [])
  .factory('Messages', ['$resource',
    function($resource){
      return $resource(
        'messages/:messageId',
        {
          messageId:'@_id'
        },
        {
          update: {method: 'PUT'}
        }
      )
    }]);