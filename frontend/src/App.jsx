import { useState } from 'react';
const [results, setResults] = useState([]);
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;

  try {
    const response = await fetch(`https://your-backend-url.com/search?term=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    setResults(data); // 👈 Store search results
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};


  return (
    <div className="App">
      <h1>Podcast Discovery</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.length > 0 ? (
          results.map((podcast, index) => (
            <div key={index} className="result-card">
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
            </div>
          ))
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
