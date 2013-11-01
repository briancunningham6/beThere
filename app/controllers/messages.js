var mongoose = require('mongoose')
    , async = require('async')
    , Message = mongoose.model('Message')
    , _ = require('underscore')

exports.create = function (req, res) {
    var message = new Message(req.body)
    message.owner = req.user
    message.save()
    res.jsonp(message)
}

exports.show = function(req, res){
    res.jsonp(req.message);
}

exports.message = function(req, res, next, id){
    var Message = mongoose.model('Message')

    Message.load(id, function (err, message) {
        if (err) return next(err)
        if (!message) return next(new Error('Failed to load message ' + id))
        req.message = message
        next()
    })
}

exports.all = function(req, res){
    Message.find({owner: req.user._id}).populate('owner').populate('message').exec(function(err, messages) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(messages);
        }
    });
}

exports.update = function(req, res){
    var message = req.message
    message = _.extend(message, req.body)

    message.save(function(err) {
        res.jsonp(message)
    })
}


exports.receive = function(req, res){
    console.log(req.query.phone);
    console.log(req.query.smscenter);
    console.log(req.query.text);
    res.jsonp("Message Received!");
}

exports.sendverificationcode = function(){

}

exports.destroy = function(req, res){
    var message = req.message
    message.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}