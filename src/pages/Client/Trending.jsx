import React, { useState, useEffect } from "react";
import { getVideoTrendingApi } from "../../api/videoApi";
import Loading from "../../components/Loading/Loading";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import Title from "../../components/Shared/Title";

const Trending = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getVideoTrendingApi();
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <Title title={"Thịnh hành | Youtube"} />
      {videos.map((data) => {
        return <VideoRecommentItem key={data?._id} data={data} />;
      })}
    </div>
  );
};

export default Trending;
