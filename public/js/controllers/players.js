window.angular.module('ngff.controllers.players', [])
    .controller('PlayersController', ['$scope','$routeParams','$location','Global','Players',
        function ($scope, $routeParams, $location, Global, Players) {
            $scope.global = Global;

            $scope.create = function () {
                var player = new Players({
                    firstname: this.player.firstname,
                    lastname: this.player.lastname,
                    phonenumber: this.player.phonenumber,
                    email: this.player.email
                });

                player.$save(function (response) {
                    //$location.path("players/" + response._id);
                    $location.path("players");
                });

                this.player.name = "";
            };

            $scope.find = function (query) {
                Players.query(query, function (players) {
                    $scope.players = players;

                });
            };

            $scope.findOne = function () {
                Players.get({ playerId: $routeParams.playerId }, function (player) {
                    $scope.player = player;
                });
            };

            $scope.update = function () {
                var player = $scope.player;

                player.$update(function () {
                    $location.path('players');
                });
            };

            $scope.remove = function (player) {
                player.$remove();
                for (var i in $scope.players) {
                    if ($scope.players[i] == player) {
                        $scope.players.splice(i, 1)
                    }
                }
            };

        }]);