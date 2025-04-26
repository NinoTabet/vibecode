import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import config from '../config';

function VibeStats() {
  const [stats, setStats] = useState({
    dailyVibes: [],
    emojiDistribution: {}
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/vibes/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  const pieData = Object.entries(stats.emojiDistribution).map(([emoji, count], index) => ({
    name: emoji,
    value: count
  }));

  return (
    <div className="vibe-stats">
      <h2>Your Vibe Statistics</h2>
      
      <div className="charts-container">
        <div className="chart">
          <h3>Daily Mood Trends</h3>
          <BarChart width={500} height={300} data={stats.dailyVibes}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="chart">
          <h3>Emoji Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default VibeStats; 