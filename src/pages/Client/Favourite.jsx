import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getVideoFavourite } from "../../redux/slice/videoFavouriteSlice";
import Loading from "../../components/Modal/ModalAuth";
import Notfound from "../Notfound/Notfound";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import WantLogin from "../../components/Shared/WantLogin";
import NoResults from "../../components/Shared/NoResults";
import Title from "../../components/Shared/Title";

const Favourite = () => {
  const { videos, error, loading } = useSelector((state) => state.favourite);
  const { currentUser } = useSelector((state) => state.auth);
  // console.log("curenUser Favourite: ", currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    dispatch(getVideoFavourite());
  }, [dispatch, currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <Loading />;

  if (error) return <Notfound />;

  if (videos.length === 0) return <NoResults />;

  return (
    <div>
      <Title title={"Video yêu thích | Youtube"} />
      {videos.map((data) => {
        return <VideoRecommentItem key={data?._id} data={data} />;
      })}
    </div>
  );
};

export default Favourite;
