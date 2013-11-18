var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    , config = require('../../config/config')[env]
    , Schema = mongoose.Schema;

var MessageSchema = new Schema({
    response: String,
    player: {type: Schema.ObjectId, ref: 'Player'},
    event: {type: Schema.ObjectId, ref: 'Event'},
    eventinstance: {type: Schema.ObjectId, ref: 'Eventinstance'},
    type: String,
    status: {type: String, default:'Pending'},
    sentdate: Date,
    confirmed: {type:Boolean, default:false},
    owner: {type: Schema.ObjectId, ref: 'User'}
});

MessageSchema.statics = {
    load: function (id, cb) {
        this.findOne({ _id : id }).populate('owner').exec(cb);
    }
};

mongoose.model('Message',MessageSchema);