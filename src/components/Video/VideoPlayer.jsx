import React, { useEffect, useRef } from "react";
import { descViewApi } from "../../api/videoApi";
import { addVideoLocal } from "../../utils/localStrorage";

const VideoPlayer = ({ videoId, url, video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 30) {
        descViewApi(videoId)
          .then((response) => {
            console.log(response.data.message);
            addVideoLocal(video);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoId, video]);

  return (
    <div className="video-player">
      <video ref={videoRef} src={url} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
