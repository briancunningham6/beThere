window.angular.module('ngff.services.teams', [])
  .factory('Teams', ['$resource',
    function($resource){
      return $resource(
        'teams/:teamId',
        {
          teamId:'@_id'
        }, 
        {
          update: {method: 'PUT' }
        }
      )
    }]);