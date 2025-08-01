const express = require('express');
const router = express.Router();
const Resource = require('../models/resourceModel');
const sampleResources = require('../data/resource.json');

// Get resources by type and location
router.get('/', async (req, res) => {
  const { location, type } = req.query;
  try {
    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = { $regex: type, $options: 'i' };

    const results = await Resource.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

// Load sample data
router.post('/addSample', async (req, res) => {
  try {
    await Resource.deleteMany({});
    await Resource.insertMany(sampleResources);
    res.json({ message: 'Sample resources added' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding resources' });
  }
});

module.exports = router;
