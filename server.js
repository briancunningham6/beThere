/*!
 *
 * Copyright(c) 2013 Brian Cunningham <brianc@kseudo.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , logger = require('mean-logger')

var https = require('https');
var http = require('http');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

// Bootstrap db connection
var db = mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});
// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()

// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

//// Start the app by listening on <port>
//var port = process.env.PORT || 3000
//app.listen(port)
//console.log('Express app started on port '+port)


// Create an HTTP service.
http.createServer(app).listen(3000);
console.log('Express app started on port 3000')

// Create an HTTPS service identical to the HTTP service.
https.createServer(config.certs, app).listen(8000);
console.log('Express app (SSL)started on port 8000')


//Initializing logger 
logger.init(app, passport, mongoose)

// expose app
exports = module.exports = app

// this section contains code the demonstrates how to poll the api and send messages via twilio
//
//// Your accountSid and authToken from twilio.com/user/account
//var accountSid = 'AC5ed314e2b51d6c4fbd01ee5af153ab89';
//var authToken = "66d86a26eedc562df8901d78ffe42add";
//
//var client = require('twilio')(accountSid, authToken);
//
//Send an SMS text message
//client.sendMessage({
//
//    to:'+353833069486', // Any number Twilio can deliver to
//    from: '+353766801046', // A number you bought from Twilio and can use for outbound communication
//    body: 'word to your mother.' // body of the SMS message
//
//}, function(err, responseData) { //this function is executed when a response is received from Twilio
//
//    if (!err) { // "err" is an error received during the request, if any
//
//        // "responseData" is a JavaScript object containing data received from Twilio.
//        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
//
//        console.log(responseData.from); // outputs "+14506667788"
//        console.log(responseData.body); // outputs "word to your mother."
//
//    }
//    else{
//        console.log(err);
//    }
//
//});

//request = require('request-json');
//var client = request.newClient('http://localhost:3000/');
//    client.get('eventinstances/', function(err, res, body) {
//        console.log(body);
//        var todaysDate = new Date();
//
//        eventInstancesList = body;
//        for(i=0;i<eventInstancesList.length;i++){
//
//            //call setHours to take the time out of the comparison
//            if(new Date(eventInstancesList[i].startdate).setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0));
//            {
//                //Date equals today's date
//                console.log("This is an event for today" + eventInstancesList[i]._id);
//            }
//        }
//
//    client.get('messages/', function(err, res, body) {
//        return console.log(body);
//    });
//    return;
//});
//
//
////Get section check for upcomming messages and sends them out!!
//var callback=function(){ console.log("erwer")}
//var list=['some','list'];
//var repeaterFunction = function(){console.log("do now!")}
//
//
//var start = function (list, callback){
//    repeaterFunction();
//    var repeater = setInterval(repeaterFunction, 5000, list, function (parsedList) {
//        // CODE STUFF HERE
//        // THEN THE CALLBACK.
//        callback(parsedDynamicList);
//    });
//}
//start();