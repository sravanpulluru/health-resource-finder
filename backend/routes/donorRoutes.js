const express = require('express');
const router = express.Router();
const Donor = require('../models/donorModel');

// @route GET /api/donors?bloodGroup=A+&location=Hyderabad
router.get('/', async (req, res) => {
  const { bloodGroup, location } = req.query;

  try {
    const query = {};
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    if (location) {
      query.location = { $regex: new RegExp(location, 'i') }; // case-insensitive search
    }

    const donors = await Donor.find(query);
    res.json(donors);
  } catch (error) {
    console.error('❌ Error fetching donors:', error);
    res.status(500).json({ message: 'Unable to fetch donor information.' });
  }
});

module.exports = router;
