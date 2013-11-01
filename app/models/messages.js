var mongoose = require('mongoose')
  , async = require('async')
  , Event = mongoose.model('Event')
  , _ = require('underscore')

exports.create = function (req, res) {
  var event = new Event(req.body)
  event.commissioner = req.user
  event.fantasyteam = req.body.fantasyteam;
  event.save()
  res.jsonp(event)
}

exports.receive = function (req, res) {
    res.jsonp('message received' || null);
}

