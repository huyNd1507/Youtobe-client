import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useParams, Route } from "react-router-dom";
import Home from "./Home";
import Video from "./Video";
import Description from "./Description";
import { getChannelInfo } from "../../redux/slice/channelSlice";
import Notfound from "../../pages/Notfound/Notfound";
import "./Channel.scss";
import Loading from "../../components/Loading/Loading";
import ChannelInfo from "../../components/Channel/ChannelInfo";

const Channel = () => {
  const { profile, loading, error } = useSelector((state) => state.channel);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannelInfo(id));
  }, [id, dispatch]);

  if (error) return <Notfound />;

  return (
    <>
      <div className="channel-container">
        <ChannelInfo profile={profile} />

        <Routes>
          <Route path="" element={<Home name={profile?.description} />} />
          <Route path="videos" element={<Video />} />
          <Route
            path="descriptions"
            element={
              <Description
                email={profile?.email}
                descriptions={profile?.description}
              />
            }
          />
        </Routes>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Channel;
