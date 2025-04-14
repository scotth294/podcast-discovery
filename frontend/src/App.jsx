import { useState } from "react";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://podcast-discovery.onrender.com/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results || []);
      console.log("Search results:", data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="app">
      <h1>Podcast Discovery</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search podcasts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.length === 0 ? (
          <p>No results yet. Try a search!</p>
        ) : (
          results.map((podcast) => (
            <div key={podcast.id} className="podcast-card">
              <img
                src={podcast.image}
                alt={podcast.name}
                className="podcast-image"
              />
              <div className="podcast-info">
                <h2>{podcast.name}</h2>
                <p className="podcast-publisher">{podcast.publisher}</p>
                <p className="podcast-description">
                  {podcast.description?.length > 200
                    ? podcast.description.slice(0, 200) + "..."
                    : podcast.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
