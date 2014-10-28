var mongoose = require('mongoose')
    , async = require('async')
    , Player = mongoose.model('Player')
    , _ = require('underscore');

exports.create = function (req, res) {
    var player = new Player(req.body)
    player.owner = req.user
    player.save()
    //winston.log('info', 'Player created!');
    res.jsonp(player)
}

exports.show = function(req, res){
    res.jsonp(req.player);
}

exports.player = function(req, res, next, id){
    var Player = mongoose.model('Player')

    Player.load(id, function (err, player) {
        if (err) return next(err)
        if (!player) return next(new Error('Failed to load player ' + id))
        req.player = player
        next()
    })
}

exports.all = function(req, res){
    Player.find({'owner': req.user._id}).populate('owner').populate('player').exec(function(err, players) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            //winston.log('info', 'Returning all players!');
            res.jsonp(players);
        }
    });
}

exports.update = function(req, res){
    var player = req.player
    player = _.extend(player, req.body)

    player.save(function(err) {
        //winston.log('info', 'Player updated!');
        res.jsonp(player)
    })
}

exports.destroy = function(req, res){
    var player = req.player
    player.remove(function(err){
        if (err) {
            //winston.log('error', 'Player could not be deleted %j !', error);
            res.render('error', {status: 500});
        } else {
            //winston.log('info', 'Player deleted!');
            res.jsonp(1);
        }
    })
}