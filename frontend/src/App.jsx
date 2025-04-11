import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // Replace with your deployed backend if needed

export default function App() {
  const [token, setToken] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [language, setLanguage] = useState('');
  const [minPopularity, setMinPopularity] = useState(0);
  const [excludeExplicit, setExcludeExplicit] = useState(false);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/token`).then((res) => {
      setToken(res.data.access_token);
    });
  }, []);

  const searchPodcasts = async () => {
    if (!token || !query) return;

    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const filtered = res.data.shows.items.filter((show) => {
        const langMatch = language ? show.languages.includes(language) : true;
        const popMatch = show.popularity >= minPopularity;
        const explicitMatch = excludeExplicit ? !show.explicit : true;
        return langMatch && popMatch && explicitMatch;
      });

      setResults(filtered);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🎧 Podcast Discovery</h1>

      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search podcasts (e.g. meditation, history)"
          className="p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>

          <label className="flex items-center gap-2">
            Min Popularity: {minPopularity}
            <input
              type="range"
              min="0"
              max="100"
              value={minPopularity}
              onChange={(e) => setMinPopularity(e.target.value)}
            />
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={excludeExplicit}
              onChange={() => setExcludeExplicit(!excludeExplicit)}
            />
            Hide Explicit
          </label>

          <button
            onClick={searchPodcasts}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {results.map((show) => (
          <div
            key={show.id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <img
                src={show.images[0]?.url}
                alt={show.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {show.description}
                </p>
                <a
                  href={show.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 mt-2 inline-block"
                >
                  Listen on Spotify →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
