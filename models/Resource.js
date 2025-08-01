const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    location: String,
    contact: String
});

module.exports = mongoose.model('Resource', ResourceSchema);
