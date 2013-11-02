window.angular.module('ngff.services.purchases', [])
  .factory('Purchases', ['$resource',
    function($resource){
      return $resource(
        'purchases/:purchaseId',
        {
          messageId:'@_id'
        },
        {
          update: {method: 'PUT'}
        }
      )
    }]);