const mongoose = require('mongoose');

// Configure the Mongoose plugin
mongoose.Promise = global.Promise;    // Make it use sane default promises
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo');

module.exports = mongoose.model('Todo', mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
}));
