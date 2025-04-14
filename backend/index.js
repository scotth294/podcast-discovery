const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS so your frontend can talk to this backend
app.use(cors());

// Optional root route
app.get("/", (req, res) => {
  res.send("Podcast Discovery API is running.");
});

// Search route
app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search query received:", query);

  // Dummy results (replace with real data later)
  const results = [
    {
      title: "The Tech Talk",
      description: "Discussing the latest in technology trends.",
      link: "https://example.com/tech-talk"
    },
    {
      title: "Coding Corner",
      description: "Deep dive into JavaScript and web development.",
      link: "https://example.com/coding-corner"
    },
    {
      title: "Debugging Diaries",
      description: "Stories and tips from real-life debugging sessions.",
      link: "https://example.com/debugging-diaries"
    }
  ];

  // Simulate simple filter by keyword match
  const filtered = results.filter(podcast =>
    podcast.title.toLowerCase().includes(query.toLowerCase()) ||
    podcast.description.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filtered);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
