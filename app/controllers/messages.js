var mongoose = require('mongoose')
    , async = require('async')
    , Message = mongoose.model('Message')
    , User = mongoose.model('User')
    , Player = mongoose.model('Player')
    , Eventinstance = mongoose.model('Eventinstance')
    , Event= mongoose.model('Event')
    , _ = require('underscore')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]

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
    message.status = "Confirmed by user";
    //message = _.extend(message, req.body)

    message.save(function(err) {
        res.jsonp(message)
    })
}

exports.confirm = function(req, res){
    var message = req.message
    message = _.extend(message, req.body)

    message.save(function(err) {
        res.jsonp(message)
    })
}

exports.receiveSMS = function(req, res){
    debugger;
    console.log(req.query.phone);
    console.log(req.query.smscenter);
    console.log(req.query.text);

    var phone = req.query.phone;
    var text = req.query.text;

    //strip prefix off the phone number
    if (phone.substring(0,5) == "00353"){
        phone = phone.substring(5,phone.length);
    }
    else if(phone.substring(0,4) == "+353"){
        phone = phone.substring(4,phone.length);
    }
    else if(phone.substring(0,1) == "0"){
        phone = phone.substring(1,phone.length);
    }
    //TODO: implement the following
    //Find a player that has this number
    Player.findOne({'phonenumber' : phone })
        .exec(function(err,player){
            Eventinstance.find().populate('owner').exec(function(err, eventinstances) {
                if (err) {
                    res.render('error', {status: 500});
                } else {
                    eventInstancesList = eventinstances;
                    todaysDate = new Date();
                    for(i=0;i<eventInstancesList.length;i++){
                        if(todaysDate.toDateString() == new Date(eventInstancesList[i].startdate).toDateString())
                        {
                            console.log('There is an event happening today');
                            Event.findOne({'_id': eventInstancesList[i].event}).populate('team').exec(function(err, event) {
                                if (err) {
                                    res.render('error', {status: 500});
                                }
                                else{
                                    if(event.team){
                                        //Look for this player in this team
                                        playerlist = JSON.parse(event.team.playerlist);
                                        playerId = -1;
                                        var i = 0;
                                        for(i=0;i<playerlist.length;i++){
                                            if (playerlist[i]['phonenumber'] = phone){
                                                playerId = playerlist[i]['_id'];
                                                break;
                                            }
                                        }

                                        if(playerId == -1){
                                            return "FAIL!!";
                                        }

                                        //Look for a message with this player id and eventinstance
                                        console.log(eventInstancesList[i].id);
                                        Message.findOne([{'_id': playerId,'eventinstance':eventInstancesList[i].id}])
                                            .exec(function(err, message){
                                                //Check if message contains the confirm/ words
                                                eventinstance = eventInstancesList[i];
                                                if (text.indexOf(event.confirmword > 0)){
                                                    message.status = 'Confirmed';
                                                    eventinstance.currentattend += 1;
                                                    if (eventinstance.currentattend == event.maxAttendance)
                                                    {
                                                        eventinstance.status = 'Ready';
                                                    }
                                                }
                                                else if (text.indexOf(event.declineword)){
                                                    message.status = 'Declined';
                                                }
                                                message.response = text;
                                                message.save();
                                                eventinstance.save();
                                                console.log('Mesage saved eventinstance updated');
                                            }
                                        )
                                    }
                                }
                            });
                        }
                    }
                }
            })
        })
    //Find an eventinstance happening today with this player
    //Find a message that has this player and eventinstance
    //Check text if it contains confirmword/declineword
    //Update eventinstance
    //Update event
    //Update message status
    //return
    res.jsonp("Message Received!");
}

exports.sendSMS = function(req, res){
    var messageid = req.body.messageid;
    var ownerid = req.body.ownerid;
    var messagetype = req.body.messagetype;


    switch(messagetype){
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
                        var client = request.newClient(config.smsGateway);
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

            if (messageid){


                console.log('Trying to find message');


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
                                                                res.render('Could not find player!', {status: 500});
                                                            } else {
                                                                //This is where you send the message!
                                                                console.log('Trying to find message!!!!!!');
                                                                text = event.message;
                                                                phonenumber = '00353'+player.phonenumber;

                                                                //Send Message!
                                                                request = require('request-json');
                                                                console.log(config.smsGateway+'sendsms?phone='+phonenumber+'&text='+encodeURIComponent(text)+'&password=pass');
                                                                var clientforsendingsms = request.newClient(config.smsGateway);
                                                                //TODO: need error checking here
                                                                clientforsendingsms.post('sendsms?phone='+phonenumber+'&text='+encodeURIComponent(text)+'&password=pass');
                                                                console.log('Messsage was sent!!!!!');
                                                                //Mesage has been sent
                                                                message.status = 'Sent';
                                                                message.save();
                                                                eventinstance.save();
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

        }
        case "ownertoplayer":
        {
            //{REQUIRED A VALID OWNERID, PLAYERID}
        }
    }
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