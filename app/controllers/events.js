var mongoose = require('mongoose')
  , async = require('async')
  , Eventinstance = mongoose.model('Eventinstance')
  , Event = mongoose.model('Event')

    , Message = mongoose.model('Message')
  , Player = mongoose.model('Player')
  , _ = require('underscore')


// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
Date.dateDiff = function(datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = { w:604800000,
        d:86400000,
        h:3600000,
        n:60000,
        s:1000 };

    return Math.floor( diff/divideBy[datepart]);
}

getNumberOfInstances = function(event){
    var numOfInstances = 1;
    if (event.recurring == 1){
        numOfInstances = Date.dateDiff('w', event.startdate, event.enddate);
    }
    else if (event.recurring == 2){
        numOfInstances = Date.dateDiff('m', event.startdate, event.enddate);
    }
    return numOfInstances;
}

createRecurringInstances = function(event){
    numofInstances = getNumberOfInstances(event);
    //TODO: Fix this hack: should not have to subtract date here
    controlvarfordate = event.startdate.getTime()-(60*60*24*7*1000);
    for (i=0;i<numofInstances;i++){
        //TODO: this needs to work for months - currently only for adds a week
        controlvarfordate += (60*60*24*7*1000);
        newDate = new Date(controlvarfordate);
        eventinstance = new Eventinstance(
            {

                'currentattend':'0',
                'owner':event.owner,
                'startdate':newDate,
                'event':event.id
            }
        );
        eventinstance.save(function(err, eventinstance){
            var eventinstanceId = eventinstance._id;
            // Now create messages for each instance
            Event.findOne({ _id: event._id }).populate('team').exec(function (err, event){

                var playerlist = JSON.parse(event.team.playerlist);
                var length = playerlist.length,
                    player = null;
                for (i=0;i<length;i++){
                    message = new Message({
                        'response': '',
                        'type':'SMS',
                        'confirmed': false,
                        'player': playerlist[i]._id,
                        'event': event.id,
                        'eventinstance': eventinstanceId,
                        'owner':event.owner
                    });
                    message.save()
                    //Push message onto the eventinstance
                    //eventinstance.messages.push(message);
                    //eventinstance.save();

                    event.eventinstances.push(eventinstance);
                    event.save();

                }
            });
        });
    }
}

exports.create = function (req, res) {
  var eventId = null;
  var event = new Event(req.body)
  event.owner = req.user
  event.team = req.body.team;
  event.save(function(err, event) {
      eventId = event.id;
      console.log(eventId);

      // Create eventinstance for the given dates
      createRecurringInstances(event);


  });

  res.jsonp(event)
}

exports.show = function(req, res){
  res.jsonp(req.event);
}

//exports.event = function(req, res, next, id){
//  var Event = mongoose.model('Event')
//
//  Event.load(id, function (err, event) {
//    if (err) return next(err)
//    if (!event) return next(new Error('Failed to load event ' + id))
//    req.event = event
//    next()
//  })
//}

exports.event = function(req, res, next, id){
    Event.findOne({'_id':id}).populate('owner').exec(function(err, event) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            req.event = event
            next()
        }
    });
}

exports.all = function(req, res, next){
//    var opts = [
//        { path: 'owner'}
//       ,{ path: 'eventinstances'},
//       ,{ path: 'eventinstances.messages', model: 'Eventinstance' }
//    ]



 Event.find().populate('owner').populate('eventinstances').populate({path:'eventinstances.messages', model:Eventinstance}).exec(function(err, events) {
   if (err) {
     res.render('error', {status: 500});
   } else {

       res.jsonp(events);
   }
 });
};


exports.update = function(req, res){
  var event = req.event
  event = _.extend(event, req.body)
  event.save(function(err) {
      if (err) {
          res.render('error', {status: 500});
      } else {
          Message.find({'event':event._id}).remove();
          Eventinstance.find({'event':event._id}).remove();
          res.jsonp(1);
      }
  })
};

exports.destroy = function(req, res){
    var Eventinstance = mongoose.model('Eventinstance');
    var Message = mongoose.model('Message');

  var event = req.event
  event.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    } else {
      //TODO: this is crud: deleting all eventinstances/messages on Event update - should be more selective
      Message.find({'event':event._id}).remove();
      Eventinstance.find({'event':event._id}).remove();

      //If the Event still exists (IE aster an update) recreate the eventinstances
      Event.findOne({ _id: event._id }).populate('team').exec(function (err, testevent){
          if(testevent){
                createRecurringInstances(event);
          }
      })

      res.jsonp(1);
    }
  })
}