// import React from "react";

// const VideoPlayer = ({ videoId, url }) => {
//   return (
//     <div className="video-player">
//       <video src={url} controls autoPlay />
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ videoId, url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoEnded = () => {
      if (videoRef.current) {
        // Kiểm tra xem videoRef.current có tồn tại trước khi gọi removeEventListener
        videoRef.current.load();
        videoRef.current.play();
      }
    };

    if (videoRef.current) {
      // Kiểm tra xem videoRef.current có tồn tại trước khi gán sự kiện
      videoRef.current.addEventListener("ended", handleVideoEnded);

      videoRef.current.src = url;
      videoRef.current.load();
      videoRef.current.play();
    }

    return () => {
      if (videoRef.current) {
        // Kiểm tra xem videoRef.current có tồn tại trước khi gọi removeEventListener
        videoRef.current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [url]);

  return (
    <div className="video-player">
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
