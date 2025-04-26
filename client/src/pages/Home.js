import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VibeEntry from '../components/VibeEntry';
import VibeStats from '../components/VibeStats';
import config from '../config';

function Home() {
  const [vibes, setVibes] = useState([]);

  useEffect(() => {
    const fetchVibes = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/vibes`);
        setVibes(response.data);
      } catch (error) {
        console.error('Error fetching vibes:', error);
      }
    };

    fetchVibes();
  }, []);

  const handleVibeAdded = (newVibe) => {
    setVibes([newVibe, ...vibes]);
  };

  return (
    <div className="home">
      <h1>Daily Vibe Journal</h1>
      <div className="content">
        <VibeEntry onVibeAdded={handleVibeAdded} />
        <div className="recent-vibes">
          <h2>Recent Vibes</h2>
          <div className="vibe-list">
            {vibes.map((vibe) => (
              <div key={vibe.id} className="vibe-item">
                <span className="vibe-emoji">{vibe.emoji}</span>
                <p className="vibe-note">{vibe.note}</p>
                <span className="vibe-date">
                  {new Date(vibe.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <VibeStats />
      </div>
    </div>
  );
}

export default Home; 