import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastList from './components/PodcastList';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function App() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/token`)
      .then(res => {
        setToken(res.data.access_token);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch token:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🎧 Podcast Discovery</h1>
      {loading ? <p>Loading...</p> : <PodcastList token={token} />}
    </div>
  );
}
