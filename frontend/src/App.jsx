import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`https://podcast-discovery.onrender.com/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Podcast Discovery</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for podcasts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {results.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            <h3>{podcast.name}</h3>
            <p>{podcast.description}</p>
            <a href={podcast.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

