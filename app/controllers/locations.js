var mongoose = require('mongoose')
  , async = require('async')
  , Location = mongoose.model('Location')
  , _ = require('underscore')

exports.create = function (req, res) {
  var location = new Location(req.body)
  location.commissioner = req.user
  location.save()
  res.jsonp(location)
}

exports.show = function(req, res){
  res.jsonp(req.location);
}

exports.location = function(req, res, next, id){
  var Location = mongoose.model('Location')

  Location.load(id, function (err, location) {
    if (err) return next(err)
    if (!location) return next(new Error('Failed to load location ' + id))
    req.location = location
    next()
  })
}

exports.all = function(req, res){
 Location.find().populate('owner').populate('location').exec(function(err, locations) {
   if (err) {
     res.render('error', {status: 500});
   } else {      
       res.jsonp(locations);
   }
 });
}

exports.update = function(req, res){
  var location = req.location
  location = _.extend(location, req.body)

  location.save(function(err) {
    res.jsonp(location)
  })
}

exports.destroy = function(req, res){
  var location = req.location
  location.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(1);
    }
  })
}