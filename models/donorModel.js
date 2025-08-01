const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
