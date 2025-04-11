import React from 'react';

import React, { useState } from 'react';
import axios from 'axios';

export default function PodcastList({ token }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchPodcasts = async () => {
    if (!query) return;

    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: query,
          type: 'show',
          limit: 10
        }
      });

      setResults(res.data.shows.items);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for podcasts..."
          className="border p-2 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchPodcasts}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <div className="grid gap-4">
          {results.map((show) => (
            <div key={show.id} className="flex items-center gap-4 border-b pb-2">
              <img src={show.images[0]?.url} alt={show.name} className="w-16 h-16 rounded" />
              <div>
                <h2 className="text-lg font-semibold">{show.name}</h2>
                <p className="text-sm text-gray-600">{show.publisher}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
