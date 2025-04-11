import React from 'react';

export default function PodcastList({ token }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p>🔐 Spotify Token:</p>
      <code className="break-words text-xs">{token}</code>
      {/* TODO: Add search/filter UI + call Spotify API here */}
    </div>
  );
}
