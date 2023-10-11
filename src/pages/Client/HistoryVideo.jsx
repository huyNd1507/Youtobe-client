import React, { useMemo } from "react";

import { getVideoLocal } from "../../utils/localStrorage";
import NoResults from "../../components/Shared/NoResults";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import Title from "../../components/Shared/Title";

const HistoryVideo = () => {
  const videos = useMemo(getVideoLocal, []);
  if (videos.length === 0) return <NoResults />;

  console.log("video from HistoryVideo: ", videos);

  return (
    <div>
      <Title title={"Video đã xem | Youtube"} />
      {videos.map((data) => {
        return <VideoRecommentItem key={data?._id} data={data} />;
      })}
    </div>
  );
};

export default HistoryVideo;
