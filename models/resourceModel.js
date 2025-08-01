const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  location: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Resource', resourceSchema);
