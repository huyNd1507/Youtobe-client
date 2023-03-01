import React, { useMemo } from "react";

import { getVideoLocal } from "../../utils/localStrorage";
import NoResults from "../../components/Shared/NoResults";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";

const HistoryVideo = () => {
  const videos = useMemo(getVideoLocal, []);
  if (videos.length === 0) return <NoResults />;

  return (
    <div>
      {videos.map((data) => {
        return <VideoRecommentItem key={data?._id} data={data} />;
      })}
    </div>
  );
};

export default HistoryVideo;
