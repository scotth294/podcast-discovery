const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Podcast Discovery Backend is running!');
});

// 🔍 New search route
app.get('/search', async (req, res) => {
  const query = req.query.query;
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!query || !accessToken) {
    return res.status(400).json({ error: 'Missing query or access token' });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    res.json({ results: data.shows.items });
  } catch (error) {
    console.error('Error fetching from Spotify API:', error);
    res.status(500).json({ error: 'Failed to fetch from Spotify API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
