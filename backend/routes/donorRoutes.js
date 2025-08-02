const express = require('express');
const router = express.Router();
const Donor = require('../models/donorModel');
const sampleDonors = require('../data/donor.json');

// 🔍 Search donors
router.get('/', async (req, res) => {
  const { location, bloodGroup } = req.query;
  try {
    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (bloodGroup) query.bloodGroup = { $regex: bloodGroup, $options: 'i' };

    const results = await Donor.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donors' });
  }
});

// 📦 Load sample data
router.post('/addSample', async (req, res) => {
  try {
    await Donor.deleteMany({});
    await Donor.insertMany(sampleDonors);
    res.json({ message: 'Sample donors added' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding donor data' });
  }
});

module.exports = router;
