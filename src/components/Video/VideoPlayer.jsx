import React from "react";

const VideoPlayer = ({ videoId, url }) => {
  return (
    <div className="video-player">
      <video src={url} controls />
    </div>
  );
};

export default VideoPlayer;
