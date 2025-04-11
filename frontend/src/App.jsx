import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodcastList from './components/PodcastList';

// Pull backend URL from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        console.log('🌐 Fetching token from:', `${BACKEND_URL}/token`); // Debug log

        const res = await axios.get(`${BACKEND_URL}/token`);
        console.log('✅ Token received:', res.data.access_token); // Debug log

        setToken(res.data.access_token);
      } catch (error) {
        console.error('❌ Error fetching token:', error.message);
      }
    };

    getToken();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🎧 Podcast Discovery</h1>
      {!token ? (
        <p>Loading token...</p>
      ) : (
        <PodcastList token={token} />
      )}
    </div>
  );
}

export default App;
