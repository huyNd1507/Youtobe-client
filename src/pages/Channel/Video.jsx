import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "react-cssfx-loading";

import { clearVideo, getChannelVideo } from "../../redux/slice/channelSlice";
import VideoItem from "../../components/Video/VideoItem";
import Loading from "../../components/Loading/Loading";
const Video = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const { videos, totalPage } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.auth);

  const [totalView, setTotalView] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getChannelVideo({ id, page, isPublic: true }));
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
      await dispatch(getChannelVideo({ id, page, isPublic: true }));
      setLoadMore(false);
    })();
  }, [id, page]);

  useEffect(() => {
    if (videos && videos.length > 0) {
      const newTotalView = videos.reduce((total, video) => {
        return total + video.totalView;
      }, 0);
      setTotalView(newTotalView);
    } else {
      setTotalView(null);
    }
  }, [videos, currentUser]);

  if (totalView === null) {
    return <Loading />;
  }

  return (
    <>
      <div className="videos">
        {videos.map(
          (item) =>
            (item.isPublic ||
              (currentUser && currentUser._id === item.writer._id)) && (
              <div key={item?._id}>
                {/* <p>{totalView} lượt xem</p> */}
                <VideoItem
                  edit={currentUser?._id === item?.writer?._id}
                  data={item}
                />
              </div>
            )
        )}
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
