import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VibeEntry from '../components/VibeEntry';
import VibeStats from '../components/VibeStats';

function Home() {
  const [vibes, setVibes] = useState([]);

  const fetchVibes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/vibes');
      setVibes(response.data);
    } catch (err) {
      console.error('Failed to fetch vibes:', err);
    }
  };

  useEffect(() => {
    fetchVibes();
  }, []);

  const handleVibeAdded = (newVibe) => {
    setVibes([newVibe, ...vibes]);
  };

  return (
    <div className="home">
      <h1>Daily Vibe Journal</h1>
      <div className="content">
        <div className="entry-section">
          <VibeEntry onVibeAdded={handleVibeAdded} />
        </div>
        <div className="stats-section">
          <VibeStats />
        </div>
        <div className="recent-vibes">
          <h2>Recent Vibes</h2>
          {vibes.map((vibe) => (
            <div key={vibe.id} className="vibe-card">
              <span className="emoji">{vibe.emoji}</span>
              <p className="note">{vibe.note}</p>
              <span className="date">
                {new Date(vibe.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home; 