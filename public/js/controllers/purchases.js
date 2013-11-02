window.angular.module('ngff.controllers.purchases', [])
  .controller('PurchasesController', ['$scope','$routeParams','$location','Global','Events','Purchases','Players','myPlayers',
    function($scope, $routeParams, $location, Global, Events, Purchases,Players,myPlayers) {
      $scope.global = Global;


      $scope.create = function () {
        var purchase = new Purchases({
          event: this.purchase.event,
          name: this.purchase.name,
          playerlist:  JSON.stringify(this.playerlist2)

        });
          

          purchase.$save(function (response) {
            
          $location.path("purchases/" + response._id);
        });

        this.event = "";
        this.name = "";
        this.players = [];

      };

      $scope.update = function () {
        var purchase = $scope.purchase;

        purchase.$update(function () {
          $location.path('purchases/' + purchase._id);
        });
      };

      $scope.find = function (query) {
          
        Purchases.query(query, function (purchases) {
          $scope.purchases = purchases;
        });
      };


        $scope.webhook = function (query) {

        };


        // Create Inital scoped playerlist
        $scope.playerlist = [{
            name: '',
            value: false
        }];

        //Create copy the view model for some reason? NB!!
        $scope.playerlistCopy = [];
        $scope.init = function(){
            $scope.playerlistCopy = angular.copy($scope.playerlist );
        }

      $scope.findOne = function () {
        Purchases.get({ purchaseId: $routeParams.purchaseId }, function (purchase) {
            
          $scope.purchase = purchase;
          //If there is an existing list in the database parse it into an array
          if (purchase.playerlist){
              
              $scope.playerlist =  JSON.parse(purchase.playerlist);
          }else{
              //If not set the scoped list of players from the Players service
              getFullPlayerList();
          }
            
        });
      };

      $scope.remove = function (purchase) {
        purchase.$remove();
        for (var i in $scope.purchases) {
          if ($scope.purchases[i] == purchase) {
            $scope.purchases.splice(i, 1)
          }
        }
      };
    }
  ]);