var mongoose = require('mongoose')
    , async = require('async')
    , Job = mongoose.model('Job')
    , _ = require('underscore')

exports.create = function (req, res) {
    var job = new Job(req.body)
    job.commissioner = req.user
    job.save()
    res.jsonp(job)
}

exports.show = function(req, res){
    res.jsonp(req.job);
}

exports.job = function(req, res, next, id){
    var Job = mongoose.model('Job')

    Job.load(id, function (err, job) {
        if (err) return next(err)
        if (!job) return next(new Error('Failed to load job ' + id))
        req.job = job
        next()
    })
}

exports.all = function(req, res){
    Job.find().populate('owner').populate('job').exec(function(err, jobs) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(jobs);
        }
    });
}

exports.update = function(req, res){
    var job = req.job
    job = _.extend(job, req.body)

    job.save(function(err) {
        res.jsonp(job)
    })
}

exports.destroy = function(req, res){
    var job = req.job
    job.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}