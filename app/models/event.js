var mongoose = require('mongoose')
  , validate = require('mongoose-validator').validate
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var nameValidator = [validate({message: "Name should be between 3 and 50 characters"},'len', 3, 50), validate('isAlphanumeric')];
var messageValidator = [validate({message: "Message should be between 3 and 500 characters"},'len', 3, 500), validate('isAlphanumeric')];
var keywordValidator = [validate({message: "Word should be between 2 and 12 characters"},'len', 3, 12), validate('isAlphanumeric')];

var EventSchema = new Schema({
	name: {type: String, required: true, validate: nameValidator},
    location: {type: String, required: true, validate: nameValidator},
    startdate: { type : Date, required: true, default: Date.now },
    enddate: { type : Date, default: Date.now },
    recurring: {type: Number},
    time: {type: Number, required: true},
    notificationtime: {type: Number, required: true},
    reminderstime: {type:Number, required: true},
    maxAttendance: {type: Number},
    minAttendance: {type: Number},
    message: {type: String},
    eventinstances : [{ type: Schema.Types.ObjectId,  ref: 'Eventinstance' }],
    disabled: {type: Boolean, default: true},
    confirmword: {type: String, required: true, validate: keywordValidator},
    declineword: {type: String, required: true, validate: keywordValidator},
	owner: {type: Schema.ObjectId, ref: 'User',required: true},
    team: {type: Schema.ObjectId, ref: 'Team',required: true}
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