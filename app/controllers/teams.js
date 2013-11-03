var mongoose = require('mongoose')
  , async = require('async')
  , Team = mongoose.model('Team')
  , _ = require('underscore')

exports.create = function (req, res) {
  var team = new Team(req.body)
  team.owner = req.user
    debugger;
  team.event = req.body.event
  team.save()
  res.jsonp(team)
}

exports.show = function(req, res){
  res.jsonp(req.team);
}

exports.team = function(req, res, next, id){
  var Team = mongoose.model('Team')
  Team.load(id, function (err, team) {
    if (err) return next(err)
    if (!team) return next(new Error('Failed to load team ' + id))
    req.team = team
    next()
  })
}

exports.all = function(req, res){
 Team.find({ owner: req.user._id}).populate('owner').populate('event').exec(function(err, teams) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(teams);
   }
 });
}

exports.update = function(req, res){
  var team = req.team
  team = _.extend(team, req.body)
  team.save(function(err) {
    res.jsonp(team)
  })
}


exports.destroy = function(req, res){
  var team = req.team
  team.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      res.jsonp(1);
    }
  })
}