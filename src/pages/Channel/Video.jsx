import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "react-cssfx-loading";

import { clearVideo, getChannelVideo } from "../../redux/slice/channelSlice";
import VideoItem from "../../components/Video/VideoItem";

const Video = () => {
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [sortType, setSortType] = useState("newest");
  const { videos, totalPage } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(getChannelVideo({ id, page, isPublic: true, sortType }));
    })();

    return () => {
      setPage(1);
      dispatch(clearVideo());
    };
  }, [id, page, sortType]);

  const handleSortClick = (type) => {
    if (type === sortType) {
      return;
    }
    setSortType(type);
    setPage(1);
  };

  const sortedVideos = [...videos].sort((a, b) => {
    if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortType === "popularity") {
      return b.totalView - a.totalView;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <div className="button-filter">
        <button
          className={sortType === "newest" ? "active" : ""}
          onClick={() => handleSortClick("newest")}
        >
          Video mới nhất
        </button>
        <button
          className={sortType === "oldest" ? "active" : ""}
          onClick={() => handleSortClick("oldest")}
        >
          Video cũ nhất
        </button>
        <button
          className={sortType === "popularity" ? "active" : ""}
          onClick={() => handleSortClick("popularity")}
        >
          Video phổ biến nhất
        </button>
      </div>
      <div className="videos">
        {sortedVideos.map(
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
