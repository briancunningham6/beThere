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

// Create an HTTP service.
http.createServer(app).listen(config.HTTPport);
console.log('Express app started on port %j', config.HTTPport )

//// Create an HTTPS service identical to the HTTP service.
//https.createServer(config.certs, app).listen(config.HTTPSport);
//console.log('Express app (SSL)started on port %j',config.HTTPsport)


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
//

//Service that checks for upcoming pending messages

var agenda = require('Agenda')({db: { address: config.db }});

agenda.define('Check for pending messages', function(job, done) {

    request = require('request-json');
    var Eventinstance = mongoose.model('Eventinstance')
        ,Event = mongoose.model('Event')
        ,Message = mongoose.model('Message')
        ,Player = mongoose.model('Player')
        ,todaysDate = new Date()

    Eventinstance.find().populate('owner').populate('eventinstance').exec(function(err, eventinstances) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            eventInstancesList = eventinstances;
            for(i=0;i<eventInstancesList.length;i++){
                if(todaysDate.toDateString() == new Date(eventInstancesList[i].startdate).toDateString())
                {
//                    //Date equals today's date
//                    console.log("This is an event for today" + eventInstancesList[i]._id);
//                    //Check status, if pending look for messages if status not pending
//                    if(eventInstancesList[i].status != 'Ready'){
//                        //Find all messages of Enventinstance that do not have a status of sent
//                        Event.find({'_id':eventInstancesList[i].event})
//                            .exec(function(err,event){
//                                //Check each Event to see if the send time/Max min attendance has passed
//                                //TODO: fix the hours arry values in the database
//                                if(event.maxAttendance > eventinstance.currentattend && event.notificationtime < todaysDate.getHours()){
//                                    Messages.find({'eventinstance':eventInstancesList[i]._id})
//                                        .exec(function(err,messages){
//                                            //Check each message to see if the allowed time has passed
//                                            //Any message that has not been sent send now
//                                            //Then increment the counter on the eventinstance.currentattend and save.
//                                        })
//                                }
//                            })
//                    }
                }
                else{
                    console.log("nope");
                }
            }
        }
    });
});

agenda.every('2 minutes', 'Check for pending messages');

agenda.start();
