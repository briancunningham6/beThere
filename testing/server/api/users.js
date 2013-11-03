//To run this test in the command line:
//grunt mocha-server:testUsers

var assert = require('assert')

var five = 5;
var six = 6;

suite('greaterThan', function() {
    test('Test if five is not equal to 6', function() {
        assert.notEqual(five, six);
    })
});


//describe('User', function(){
//    describe('#save()', function(){
//        it('should save without error', function(done){
//            var user = new User('Luna');
//            user.save(function(err){
//                if (err) throw err;
//                done();
//            });
//        })
//    })
//})