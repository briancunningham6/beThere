window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', 
	{ 
		templateUrl: 'views/index.html' 
	})
    .when('/locations',
    {
        templateUrl: "views/locations/list.html"
    })
        .when('/locations/create',
        {
            templateUrl: 'views/locations/create.html'
        })
        .when('/locations/:locationId/edit',
        {
            templateUrl: 'views/locations/edit.html'
        })
        .when('/locations/:locationId',
        {
            templateUrl: 'views/locations/view.html'
        })
  .when('/events',
  { 
    templateUrl: 'views/events/list.html'
  })
  .when('/events/create',
  { 
    templateUrl: 'views/events/create.html'
  })  
  .when('/events/:eventId/edit',
  { 
    templateUrl: 'views/events/edit.html'
  })
  .when('/events/:eventId',
  { 
    templateUrl: 'views/events/view.html'
  })
        .when('/messages',
        {
            templateUrl: 'views/messages/list.html'
        })
        .when('/messages/create',
        {
            templateUrl: 'views/messages/create.html'
        })
        .when('/messages/:messageId/edit',
        {
            templateUrl: 'views/messages/edit.html'
        })
        .when('/messages/:messageId',
        {
            templateUrl: 'views/messages/view.html'
        })
    .when('/eventinstances',
    {
        templateUrl: 'views/eventinstances/list.html'
    })
    .when('/eventinstances/create',
    {
        templateUrl: 'views/eventinstances/create.html'
    })
    .when('/eventinstances/:eventinstanceId/edit',
    {
        templateUrl: 'views/eventinstances/edit.html'
    })
    .when('/eventinstances/:eventId',
    {
        templateUrl: 'views/eventinstances/view.html'
    })
  .when('/teams',
  {
    templateUrl: 'views/teams/list.html'
  })
  .when('/teams/create',
  { 
    templateUrl: 'views/teams/create.html'
  })  
  .when('/teams/:teamId/edit',
  { 
    templateUrl: 'views/teams/edit.html'
  })
  .when('/teams/:teamId',
  { 
    templateUrl: 'views/teams/view.html'
  })
  .when('/players',
  {
  	templateUrl: 'views/players/list.html'
  })
    .when('/players/create',
    {
        templateUrl: 'views/players/create.html'
    })
    .when('/players/:playerId/edit',
    {
        templateUrl: 'views/players/edit.html'
    })
    .when('/players/:playerId',
    {
        templateUrl: 'views/players/view.html'
    })
    .when('/users/changephone',
    {
        templateUrl: 'views/users/changephone.html'
    })
    .when('/users/showphone',
    {
        templateUrl: 'views/users/showphone.html'
    })
    .when('/users/:userId',
    {
        templateUrl: 'views/users/profile.html'
    })
    .when('/purchases/buy',
    {
        templateUrl: 'views/purchases/buy.html'
    })

	.otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);