window.angular.module('ngff.controllers.teams', [])
  .controller('TeamsController', ['$scope','flash','$routeParams','$location','Global','Events','Teams','Players','myPlayers',
    function($scope, flash, $routeParams, $location, Global, Events, Teams,Players,myPlayers) {
      $scope.global = Global;


        //Helper function to set the scoped playerlist from the Player service
        $scope.playerlist = '';
        getFullPlayerList = function(cb){
            myPlayers.getPlayers().then(function (data) {
                $scope.playerlist = data.data;
                debugger;
                cb(data);
            });
        }

        $scope.populateEvents = function(query) {
            Events.query(query, function (events) {

            $scope.events = events;
            myPlayers.getPlayers().then(function (data) {
                $scope.playerlist2 = data.data;

                });
            });
        };

      $scope.create = function () {
        var team = new Teams({
          event: this.team.event,
          name: this.team.name,
          playerlist:  JSON.stringify(this.playerlist2)

        });
          

        team.$save(function (response) {
          flash.success = 'Team created';
          $location.path("teams/");
        });

        this.event = "";
        this.name = "";
        this.players = [];

      };

      $scope.update = function () {
        var team = $scope.team;
        team.playerlist =  JSON.stringify($scope.playerlistCopy);

        team.$update(function () {
          $location.path('teams/' + team._id);
        });
      };

      $scope.find = function (query) {
          
        Teams.query(query, function (teams) {
          $scope.teams = teams;
        });
      };


        // Create Inital scoped playerlist
        $scope.playerlist = [{
            name: '',
            value: false
        }];

        //TODO: find out why this is necessary
        //Create copy the view model for some reason? NB!!
        $scope.playerlistCopy = [];
        $scope.init = function(){
            $scope.playerlistCopy = angular.copy($scope.playerlist );
        }


      $scope.findOne = function () {
        Teams.get({ teamId: $routeParams.teamId }, function (team) {
            
          $scope.team = team;
          //If there is an existing list in the database parse it into an array
          if (team.playerlist){

              fullPlayerlist = getFullPlayerList(function(result){
                  fullPlayerlist = result.data;
                  savedPlayerList = JSON.parse(team.playerlist);
                  $scope.playerlist =  $.extend(fullPlayerlist,savedPlayerList);
              });
          }else{
              //If not set the scoped list of players from the Players service
              getFullPlayerList();
          }
            
        });
      };

      $scope.remove = function (team) {
        team.$remove();
        for (var i in $scope.teams) {
          if ($scope.teams[i] == team) {
            $scope.teams.splice(i, 1)
          }
        }
        flash.error = 'Team has been deleted!';
      };
    }
  ]);