const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    name: String,
    bloodType: String,
    phone: String,
    city: String
});

module.exports = mongoose.model('Donor', DonorSchema);
