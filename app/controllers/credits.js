var mongoose = require('mongoose')
  , async = require('async')
  , Credit = mongoose.model('Credit')
  , _ = require('underscore')

exports.create = function (req, res) {
  var credit = new Credit(req.body)
  credit.owner = req.user
  credit.event = req.body.event
  credit.save()
  res.jsonp(credit)
}

exports.show = function(req, res){
  res.jsonp(req.credit);
}

exports.credit = function(req, res, next, id){
  var Credit = mongoose.model('Credit')
  Credit.load(id, function (err, credit) {
    if (err) return next(err)
    if (!credit) return next(new Error('Failed to load purchases ' + id))
    req.credit = credit
    next()
  })
}

exports.all = function(req, res){
 Credit.find({ owner: req.user._id}).populate('owner').populate('event').exec(function(err, credits) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(credits);
   }
 });
}

exports.update = function(req, res){
  var credit = req.credit
  credit = _.extend(credit, req.body)
  credit.save(function(err) {
    res.jsonp(credit)
  })
}


exports.buy = function(req, res){
    //This is the webhook for stripe
    //Read the response update the users purchases account
    //Add a purchases model
    res.jsonp(req.body)
}



exports.destroy = function(req, res){
  var credit = req.credit
  credit.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(1);
    }
  })
}