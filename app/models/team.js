var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var TeamSchema = new Schema({
  owner: {type: Schema.ObjectId, ref: 'User'},
  event: {type: Schema.ObjectId, ref: 'Event'},
  name : {type: String},
  playerlist : {type:String}
});

TeamSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('owner').populate('event').exec(cb);
  }
};

mongoose.model('Team', TeamSchema);