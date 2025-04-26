const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/vibes', (req, res) => {
  // TODO: Replace with Firestore
  res.json([]);
});

app.post('/api/vibes', (req, res) => {
  const { emoji, note } = req.body;
  // TODO: Replace with Firestore
  res.status(201).json({ emoji, note, timestamp: new Date() });
});

app.get('/api/vibes/stats', (req, res) => {
  // TODO: Replace with Firestore
  res.json({
    dailyVibes: [],
    emojiDistribution: {}
  });
});

// Export the API to Firebase Functions
exports.api = functions.https.onRequest(app); 

