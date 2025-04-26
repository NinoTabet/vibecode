import React, { useState } from 'react';
import axios from 'axios';

const emojiOptions = ['😊', '😢', '😡', '😴', '🤔', '😍', '😎', '😭', '🤯', '🥳'];

function VibeEntry({ onVibeAdded }) {
  const [emoji, setEmoji] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emoji || !note) {
      setError('Please select an emoji and write a note');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/vibes', {
        emoji,
        note
      });
      onVibeAdded(response.data);
      setEmoji('');
      setNote('');
      setError('');
    } catch (err) {
      setError('Failed to save your vibe. Please try again.');
    }
  };

  return (
    <div className="vibe-entry">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="emoji-selector">
          {emojiOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`emoji-btn ${emoji === option ? 'selected' : ''}`}
              onClick={() => setEmoji(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="note-input">
          <textarea
            placeholder="Write a short note about your day..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength="200"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-btn">
          Save Vibe
        </button>
      </form>
    </div>
  );
}

export default VibeEntry; 