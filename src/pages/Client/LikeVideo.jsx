import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLikeVideoApi } from "../../api/videoApi";
import Loading from "../../components/Loading/Loading";

import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import WantLogin from "../../components/Shared/WantLogin";
import NoResults from "../../components/Shared/NoResults";
import Title from "../../components/Shared/Title";

const LikeVideo = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getLikeVideoApi();
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <Loading />;

  if (videos.length === 0) return <NoResults />;
  return (
    <div>
      <Title title={"Video đã thích | Youtube"} />
      {videos.map((data) => (
        <VideoRecommentItem key={data?._id} data={data} />
      ))}
    </div>
  );
};

export default LikeVideo;
