const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// In-memory storage for vibes (in a real app, you'd use a database)
let vibes = [];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Daily Vibe Journal API' });
});

// Get all vibes
app.get('/api/vibes', (req, res) => {
  res.json(vibes);
});

// Add a new vibe
app.post('/api/vibes', (req, res) => {
  const { emoji, note } = req.body;
  
  if (!emoji || !note) {
    return res.status(400).json({ error: 'Emoji and note are required' });
  }

  const newVibe = {
    id: Date.now(),
    emoji,
    note,
    date: new Date().toISOString()
  };

  vibes.push(newVibe);
  res.status(201).json(newVibe);
});

// Get vibes by date range
app.get('/api/vibes/stats', (req, res) => {
  const stats = {
    totalVibes: vibes.length,
    emojiCount: {},
    dailyVibes: {}
  };

  // Count emojis and organize by date
  vibes.forEach(vibe => {
    // Count emoji occurrences
    stats.emojiCount[vibe.emoji] = (stats.emojiCount[vibe.emoji] || 0) + 1;
    
    // Group by date
    const date = vibe.date.split('T')[0];
    if (!stats.dailyVibes[date]) {
      stats.dailyVibes[date] = [];
    }
    stats.dailyVibes[date].push(vibe);
  });

  res.json(stats);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

