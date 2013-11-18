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


//Setup database logging
var winston = require('winston');
require('winston-mongodb').MongoDB;
var options = new Object();
options.db = 'beThere-dev';
winston.add(winston.transports.MongoDB, options);

winston.log('info', 'Application has started!');

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