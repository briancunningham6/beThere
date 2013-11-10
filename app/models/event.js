var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var EventSchema = new Schema({
	name: {type: String},
    location: {type: String},
    startdate: { type : Date, default: Date.now },
    enddate: { type : Date, default: Date.now },
    recurring: {type: Number},
    time: {type: Number},
    notificationtime: {type: Number},
    reminderstime: {type:Number},
    maxAttendance: {type: Number},
    minAttendance: {type: Number},
    message: {type: String},
    eventinstances : [{ type: Schema.Types.ObjectId,  ref: 'Eventinstance' }],
    disabled: {type: Boolean},
    confirmword: {type: String},
    declineword: {type: String},
	owner: {type: Schema.ObjectId, ref: 'User'},
    team: {type: Schema.ObjectId, ref: 'Team'}
});

EventSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('owner').exec(cb);
  }
};


/**
 * Methods
 */

EventSchema.methods = {

    getEventinstances: function(event,callback) {
        //Load Credits model
        var Eventinstance = mongoose.model('Eventinstance');
        Eventinstance.find({'event':event._id})
            .exec(function(err,eventinstances){
                //this.eventinstances = eventinstances;
                return eventinstances;
            })
    }
}

mongoose.model('Event', EventSchema);