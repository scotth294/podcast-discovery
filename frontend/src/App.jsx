import { useState } from "react";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Searching for:", query);

    try {
      const res = await fetch(`https://podcast-discovery.onrender.com/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      console.log("Results from backend:", data);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Podcast Discovery</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for podcasts..."
          style={{ padding: "0.5rem", flex: 1 }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Search
        </button>
      </form>

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((podcast, idx) => (
            <li key={idx} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
