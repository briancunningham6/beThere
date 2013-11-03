var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

var LocationSchema = new Schema({
	name: {type: String}
});

LocationSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('commissioner').exec(cb);
  }
};

mongoose.model('Location',LocationSchema);