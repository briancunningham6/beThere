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
    //eventinstances: {type: String, default:''},
    disabled: {type: Number},
	owner: {type: Schema.ObjectId, ref: 'User'},
    team: {type: Schema.ObjectId, ref: 'Team'}
});

EventSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('owner').exec(cb);
  }
};

mongoose.model('Event', EventSchema);