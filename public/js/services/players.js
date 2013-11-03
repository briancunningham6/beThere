window.angular.module('ngff.services.players', [])


    .factory('myPlayers', function($http) {
        return {
            getPlayers: function() {
                    var promise = $http({
                        url: 'http://localhost:3000/players',
                        method: "GET"
                    }).success(function (data) {
                            return data;
                        });
                    return promise;
            }
        }
    })
  .factory('Players', ['$resource',
    function($resource){
        return $resource(
            'players/:playerId',
            {
                playerId:'@_id'
            },
            {
                update: {method: 'PUT'}
            }
        )
    }]);
