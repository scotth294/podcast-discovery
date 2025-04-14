const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'https://your-frontend.vercel.app' }));

app.get('/token', async (req, res) => {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.json({ access_token: response.data.access_token });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🆕 Search route
app.get('/search', async (req, res) => {
  const query = req.query.query;
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!query || !accessToken) {
    return res.status(400).json({ error: 'Missing query or access token' });
  }

  try {
    const spotifyRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await spotifyRes.json();
    const results = data.shows?.items || [];

    res.json({ results });
  } catch (err) {
    console.error('Spotify API error:', err);
    res.status(500).json({ error: 'Failed to fetch from Spotify' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
