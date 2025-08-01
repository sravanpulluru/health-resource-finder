console.log("🛠️ Backend is starting...");

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const resourceRoutes = require('./backend/routes/resourceRoutes');
const donorRoutes = require('./backend/routes/donorRoutes');
const authRoutes = require('./backend/routes/authRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ✅ API Routes
app.use('/api/resources', resourceRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/auth', authRoutes);

// ✅ Default route to load login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
