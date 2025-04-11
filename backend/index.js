const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allow requests from your Vercel frontend
const corsOptions = {
  origin: 'https://podcast-discovery-nine.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ✅ Your /token route to get Spotify token
app.get('/token', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    data: new URLSearchParams({
      grant_type: 'client_credentials'
    }).toString()
  };

  try {
    const response = await axios(authOptions);
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('❌ Error fetching Spotify token:', error.message);
    res.status(500).json({ error: 'Failed to fetch token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
