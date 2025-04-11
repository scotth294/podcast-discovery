import { useEffect, useState } from 'react';
fetch("https://podcast-discovery.onrender.com/token")
export default function App() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://your-backend.onrender.com/token')
      .then(res => res.json())
      .then(data => {
        setToken(data.access_token);
        setLoading(false);
      })
      .catch(err => {
        console.error('Token error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <h1>🎧 Podcast Discovery</h1>
      {loading ? <p>Loading...</p> : <p>Token Loaded</p>}
    </div>
  );
}
