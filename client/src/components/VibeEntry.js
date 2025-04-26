import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

function VibeEntry({ onVibeAdded }) {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const emojis = ['😊', '😢', '😡', '😴', '🤔', '😎', '🥳', '😷'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedEmoji || !note) {
      setError('Please select an emoji and enter a note');
      return;
    }

    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/vibes`, {
        emoji: selectedEmoji,
        note: note
      });

      if (onVibeAdded) {
        onVibeAdded(response.data);
      }

      setSelectedEmoji('');
      setNote('');
    } catch (err) {
      setError('Failed to save your vibe. Please try again.');
      console.error('Error saving vibe:', err);
    }
  };

  return (
    <div className="vibe-entry">
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="emoji-selector">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              className={`emoji-button ${selectedEmoji === emoji ? 'selected' : ''}`}
              onClick={() => setSelectedEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note about your feelings..."
          rows="3"
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-button">
          Save Vibe
        </button>
      </form>
    </div>
  );
}

export default VibeEntry; 