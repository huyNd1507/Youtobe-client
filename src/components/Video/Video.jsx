import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Video.scss";
import { clearData } from "../../redux/slice/infinityLoadSlice";
import VideoItem from "./VideoItem";
import Loading from "../../components/Loading/Loading";
import Notfound from "../../pages/Notfound/Notfound";
import NoResults from "../Shared/NoResults";

const Video = ({ page, setPage, GetData }) => {
  const { data, totalPage, error } = useSelector((state) => state.infinity);
  console.log("data: ", data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(GetData(page));
      setLoading(false);
    })();

    return () => {
      dispatch(clearData());
    };
  }, []);

  useEffect(() => {
    if (page === 1) return;
    dispatch(GetData(page));
  }, [page]);

  if (loading) return <Loading />;

  if (error) return <Notfound />;

  return (
    <>
      {data.length > 0 ? (
        <InfiniteScroll
          dataLength={data?.length}
          hasMore={page < totalPage}
          next={() => setPage((prev) => prev + 1)}
          height={`calc(100vh - 65px)`}
        >
          <div className="videos">
            {data.map((data) => (
              <VideoItem key={data._id} data={data} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default Video;
