const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Podcast Discovery API!');
});

// 🔍 Search route
app.get('/search', async (req, res) => {
  const term = req.query.term;

  if (!term) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Mock search result
    const mockResults = [
      {
        title: `Sample Podcast Matching "${term}"`,
        description: 'This is just a mock result. Real results coming soon!'
      }
    ];

    res.json(mockResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
