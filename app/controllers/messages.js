var mongoose = require('mongoose')
    , async = require('async')
    , Message = mongoose.model('Message')
    , User = mongoose.model('User')
    , Eventinstance = mongoose.model('Eventinstance')
    , Event= mongoose.model('Event')
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
    Message.find({owner: req.user._id}).populate('owner').populate('message').populate('player').exec(function(err, messages) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            debugger;
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


exports.sendSMS = function(req, res){
    var messageid = req.body.messageid;
    var ownerid = req.body.ownerid;
    var type = req.body.type;

    switch(type){
        case "phoneconfirmation":
        {
            //{REQUIRES A VALID OWNERID}
            //Lookup user from the ownerid
            //Get the user.phonenumber
            //Get the confirmation code
            //Form a URL for sending the message
            //Send the message
            //Check that the message returns "Message sent!"

            User.findOne({_id:ownerid})
                .exec(function(err,user){
                    if (err) {
                        res.render('Could not find user!', {status: 500});
                    } else {
                        message = "Verification code: "+ user.phoneverificationcode;
                        phonenumber = '00353'+user.phonenumber;

                        //Send Message!
                        request = require('request-json');
                        var client = request.newClient('http://89.101.34.173:9090');
                        client.post('/sendsms?phone='+phonenumber+'&text='+message+'&password=pass', function(err, res, body) {
                            if (err) {
                                res.render('error', {status: 500});
                            } else {
                                //TODO: need error checking here
                                //Mesage has been sent
                                res.jsonp(1);
                            }
                        });
                        res.jsonp(1);
                    }
                    res.jsonp(1);
                })
        }
        case "eventnotification":
        {
            //{REQUIRED A VAILD OWNERID, MESSAGEID, EVENTID, EVENTINSTANCEID}
            //Lookup user
            //Lookup the eventinstance
            //Lookup the event
            //Lookup message (cannot be null)
            //Lookup the Player from the message
            //Send the message to the player.phonenumber with the event.message
            //If it returns "Message sent!", update the eventinstance

            User.findOne({_id:ownerid})
                .exec(function(err,user){
                    if (err) {
                        res.render('Could not find user!', {status: 500});
                    } else {
                        Message.findOne({_id:messageid})
                            .exec(function(err,message){
                                if (err) {
                                    res.render('Could not find message!', {status: 500});
                                } else {
                                    Eventinstance.findOne({_id:message.eventinstance})
                                        .exec(function(err,eventinstance){
                                            if (err) {
                                                res.render('Could not find eventinstance!', {status: 500});
                                            } else {
                                                Event.findOne({_id:eventinstance.event})
                                                    .exec(function(err,event){
                                                        if (err) {
                                                            res.render('Could not find event!', {status: 500});
                                                        } else {

                                                            Player.findOne({_id:message.player})
                                                                .exec(function(err,player){
                                                                    if (err) {
                                                                        res.render('Could not find event!', {status: 500});
                                                                    } else {
                                                                        //This is where you send the message!

                                                                        message = event.message;
                                                                        phonenumber = '00353'+player.phonenumber;

                                                                        //Send Message!
                                                                        request = require('request-json');
                                                                        var client = request.newClient('http://89.101.34.173:9090');
                                                                        client.post('/sendsms?phone='+phonenumber+'&text='+message+'&password=pass', function(err, res, body) {
                                                                            if (err) {
                                                                                res.render('error', {status: 500});
                                                                            } else {
                                                                                //TODO: need error checking here
                                                                                //Mesage has been sent
                                                                                message.status = 'Sent';
                                                                                message.save();
                                                                                res.jsonp(1);
                                                                            }
                                                                        });
                                                                        res.jsonp(1);

                                                                    }
                                                                })
                                                        }
                                                    })

                                            }
                                        })
                                }
                            })
                    }
                    res.jsonp(1);
                })
        }
        case "ownertoplayer":
        {
            //{REQUIRED A VALID OWNERID, PLAYERID}
        }
    }

//    Message.findOne({_id:messageid})
//        .exec(function(err,message){
//            if (err) {
//                res.render('Could not find message!', {status: 500});
//            } else {
//                    //Update message
//                    result.status = 'Sent';
//                    result.sentdate = new Date();
//                    result.save(function(err,result){
//                        //TODO: Message sent - if sent by a user create a credit record
//                        if(ownerid){
//                            decrement = new Credit({
//                                owner: ownerid,
//                                value: -1,
//                                reason: "Sent SMS"
//                            });
//                            decrement.save(function(err){
//                                res.jsonp("SMS Sent");
//                            })
//                        }
//                        res.render('Some strange error!', {status: 500});
//                    })
//        }
//    })
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