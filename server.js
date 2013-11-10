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


//Setup logging
var winston = require('winston');
require('winston-mongodb').MongoDB;

//var MongoDB = require('winston-mongodb').MongoDB;
//var logger = new (winston.Logger)({
//    transports: [
//        new (winston.transports.Console)(),
//        new (winston.transports.MongoDB)({ host: 'localhost',  db: 'caribcultivate', collection: 'log', level: 'info'})
//    ], exceptionHandlers: [ new winston.transports.Console() ]
//});
////logger.log('info', "Running logs "+ new Date());



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

    var eventInstancesList;

    Eventinstance.find().populate('owner').populate('eventinstance').exec(function(err, eventinstances) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            eventInstancesList = eventinstances;
            for(i=0;i<eventInstancesList.length;i++){
                if(todaysDate.toDateString() == new Date(eventInstancesList[i].startdate).toDateString())
                {
                    var currentattendance = eventInstancesList[i].currentattend;
                    var currenteventinstanceid = eventInstancesList[i]._id;
                    var ownerid = eventInstancesList[i].owner;
                    //Check status, if pending look for messages if status not pending
                    if(eventInstancesList[i].status != 'Ready'){
                        //Find all messages of Enventinstance that do not have a status of sent
                        console.log("Looking for event");
                        Event.findOne({'_id':eventInstancesList[i].event})
                            .exec(function(err,event){
                                //Check each Event to see if the send time/Max min attendance has passed
                                //TODO: fix the hours arry values in the database
                                //console.log(event);
                                //console.log("Checking if event is full: max %j and current %k", event.maxAttendance,currentattendance );
                                // If Event is disabled do not go any further
                                if (event.disabled == false){
                                    return 'This event has been disabled';
                                }
                                //TODO: Check the times!!!
                                if(event.maxAttendance > currentattendance){
                                    console.log("Event not full");
                                    Message.find({'eventinstance':currenteventinstanceid})
                                        .exec(function(err,messages){
                                            //Check each message to see if the allowed time has passed
                                            //Any message that has not been sent send now
                                            //Then increment the counter on the eventinstance.currentattend and save.
                                            messages.forEach(function(message){
                                                if (message.status != 'Sent'){
                                                    console.log("Sending message to %j now",message.player);
                                                    console.log(config.HTTPDomain+':'+config.HTTPport+'/messages/sendSMS');
                                                    var request = require('request');
                                                    //console.log(message);
                                                    request.post(
                                                        config.HTTPDomain+':'+config.HTTPport+'/messages/sendSMS',
                                                        { form: {  messageid: message.id, ownerid: ownerid, messagetype:'eventnotification'}  },
                                                        function (error, response, body) {
                                                            if (!error ) {
                                                                //Set the message status to Sent!!
                                                                console.log('Message sent and updated!');
                                                            }
                                                        }
                                                    );
                                                }
                                            })
                                        })
                                }
                            })
                    }
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
