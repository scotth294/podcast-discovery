import { useState } from 'react';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await fetch(`https://podcast-discovery.onrender.com/search?term=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Podcast Discovery</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {results.length > 0 ? (
          results.map((podcast, index) => (
            <div key={index} className="podcast-card">
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
              {podcast.link && (
                <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                  Listen
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No results yet. Try searching!</p>
        )}
      </div>
    </div>
  );
}

export default App;
