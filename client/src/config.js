const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://us-central1-daily-vibe-journal.cloudfunctions.net/api'
    : 'http://localhost:5001/daily-vibe-journal/us-central1/api'
};

export default config; 