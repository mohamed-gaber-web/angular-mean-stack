const mongoose = require('mongoose');

const postSckema = mongoose.Schema({
  // fields
  title:   { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Post', postSckema);



/**
- Create Model
- Use mongoose objects
- Use mongoose.Sckema({}) to create sckema
- Use mongoose.model() to create model
 */
