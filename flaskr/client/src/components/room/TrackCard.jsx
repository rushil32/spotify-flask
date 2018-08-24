import React from 'react';

const TrackName = ({ track }) => {
  if (!track.name) return;

  return (
    <div className="track-card">
      <img src={track.album.images[2].url} alt={track.album.name} />
      <div>
        <span>{track.name}</span>
        <span>{track.album.name}</span>
        <span>{track.artists[0].name}</span>
      </div>
    </div>
  );
};

export default TrackName;
