import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "react-cssfx-loading";

import { clearVideo, getChannelVideo } from "../../redux/slice/channelSlice";
import VideoItem from "../../components/Video/VideoItem";

const Video = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const { videos, totalPage } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getChannelVideo({ id, page }));
    })();

    return () => {
      setPage(1);
      dispatch(clearVideo());
    };
  }, [id]);

  useEffect(() => {
    (async () => {
      if (page === 1) return;
      setLoadMore(true);
      await dispatch(getChannelVideo({ id, page }));
      setLoadMore(false);
    })();
  }, [id, page]);

  return (
    <>
      <div className="videos">
        {videos.map((item) => (
          <VideoItem
            edit={currentUser?._id === item?.writer?._id}
            key={item?._id}
            data={item}
          />
        ))}
      </div>
      {loadMore && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}
      {page < totalPage && (
        <div className="text-center">
          <button onClick={() => setPage(page + 1)}>Xem thêm</button>
        </div>
      )}
    </>
  );
};

export default Video;
