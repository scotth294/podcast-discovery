const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Spotify credentials from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Route: Search Podcasts
app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    // Step 1: Get Spotify Access Token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Search for Podcasts
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          q: query,
          type: 'show', // 'show' is the type for podcasts
          limit: 10,
        },
      }
    );

    const podcasts = searchResponse.data.shows.items;

    res.json(podcasts);
  } catch (error) {
    console.error('Error during Spotify search:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch from Spotify' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
