window.angular.module('ngff.controllers.index', [])
  .controller('IndexController', ['$scope','flash',
    function ($scope,flash){
            $scope.myInterval = 9000;
            var slides = $scope.slides = [];
            $scope.addSlide = function() {
                var newWidth = 200 + ((slides.length + (25 * slides.length)) % 150);
                slides.push({
                    image: 'http://placekitten.com/' + newWidth + '/200',
                    text: ['How to best organize an event that needs a fixed number of participants with the least hassle?','Organize your event via SMS and with a tool that removes the pain of keeping track of the attendance.','beThere enables you to manage events by automating the sending/receiving of attendance notifications'][slides.length % 3],
                    fulltext: ['In here goes a bunch of text explaining how much of a pain in the ass it is to get people to confirm their attendance for events like 5 a side football/poker that need confirmed numbers.','In here goes a bunch of text explaining how SMS is a good way to get people to respond except that its a pain in the ass to sift through messages and keep track of replies.','In here goes some text about how beThere works'][slides.length % 3],
                    button: ['The problem','The solution', 'How it works'][slides.length % 3]
                });
            };
            for (var i=0; i<3; i++) {
                $scope.addSlide();
            }

    }]);
