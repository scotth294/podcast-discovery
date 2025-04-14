const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// ✅ Read from Render environment variables
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

let token = null;
let tokenExpiresAt = null;

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  token = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000;
}

async function ensureToken(req, res, next) {
  if (!token || Date.now() >= tokenExpiresAt) {
    await getAccessToken();
  }
  next();
}

app.get('/search', ensureToken, async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&limit=10`;

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.shows && data.shows.items) {
      res.json(data.shows.items);
    } else {
      res.status(500).json({ error: 'Invalid Spotify response' });
    }
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Something went wrong during search' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
