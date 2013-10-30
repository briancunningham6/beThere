window.angular.module('ngff.controllers.jobs', [])
  .controller('JobsController', ['$scope','$routeParams','$location','Global','Jobs','FantasyTeams',
    function ($scope, $routeParams, $location, Global, Jobs, FantasyTeams) {
      $scope.global = Global;

        $scope.populateTeams = function(query) {
            FantasyTeams.query(query, function (fantasyteams) {
                $scope.fantasyteams = fantasyteams;
            });
        };


        $scope.days = [
            {dayId : 0, dayName : 'Monday' },
            {dayId : 1, dayName : 'Tuesday' },
            {dayId : 2, dayName : 'Wednesday' },
            {dayId : 3, dayName : 'Thursday' },
            {dayId : 4, dayName : 'Friday' },
            {dayId : 5, dayName : 'Saturday' },
            {dayId : 6, dayName : 'Sunday' }
        ];

        $scope.times = [
            {timeId : 0, timeName : '00:00' },
            {timeId : 1, timeName : '00:15' },
            {timeId : 2, timeName : '00:30' },
            {timeId : 3, timeName : '00:45' },
            {timeId : 4, timeName : '01:00' },
            {timeId : 5, timeName : '01:15' },
            {timeId : 6, timeName : '01:30' }
        ];

      $scope.create = function () {
        var job = new Jobs({
          name: this.job.name,
          day: this.job.day,
          location: this.job.location,
          maxAttendance: this.job.maxAttendance,
          minAttendance: this.job.minAttendance,
          time: this.job.time,
          notificationTime: this.job.notificationTime,
          fantasyteam: this.job.fantasyteam
        });

        job.$save(function (response) {
          $location.path("jobs/" + response._id);
        });

        this.job.name = "";
      };

      $scope.find = function (query) {
        Jobs.query(query, function (jobs) {
          $scope.jobs = jobs;

        });
      };

     	$scope.findOne = function () {
    	  Jobs.get({ jobId: $routeParams.jobId }, function (job) {
    	    $scope.job = job;
    	  });
    	}; 

    	$scope.update = function () {
    	  var job = $scope.job;
            debugger;

    	  job.$update(function () {
    	    $location.path('jobs/' + job._id);
    	  });
    	};

    	$scope.remove = function (job) {
    	  job.$remove();
    	  for (var i in $scope.jobs) {
    	    if ($scope.jobs[i] == job) {
    	      $scope.jobs.splice(i, 1)
    	    }
    	  }
    	};

    }]);