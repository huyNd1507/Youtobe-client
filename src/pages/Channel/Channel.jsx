import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useParams, Route, useLocation, Link } from "react-router-dom";
import Home from "./Home";
import Video from "./Video";
import Description from "./Description";
import { getChannelInfo } from "../../redux/slice/channelSlice";
import Notfound from "../../pages/Notfound/Notfound";
import "./Channel.scss";
import ModalUpdateUser from "../../components/Modal/ModalUpdateUser";
import Loading from "../../components/Loading/Loading";

const Channel = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.channel);
  const { subsrciptCount } = useSelector((state) => state.sub);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannelInfo(id));
  }, [id, dispatch]);

  if (error) return <Notfound />;

  return (
    <>
      <div className="channel-container">
        <div className="channel-info">
          <div className="channel-info-user">
            <img src={profile?.avatar} alt={"avatar"} />
            <div>
              <span>{profile?.name}</span>
              <span> {subsrciptCount} người đăng ký</span>
            </div>
          </div>
          <div>
            {currentUser?._id !== profile?._id ? (
              <button>Đăng ký</button>
            ) : (
              <button onClick={() => setShow(true)}>Tùy chỉnh kênh</button>
            )}
          </div>
        </div>

        <div className="channel-navbar">
          <ul>
            <li
              className={`${
                location.pathname === `/channel/${id}` ? "active" : null
              } `}
            >
              <Link to={`/channel/${id}`}>Trang chủ</Link>
            </li>
            <li
              className={`${
                location.pathname === `/channel/${id}/videos` ? "active" : null
              } `}
            >
              <Link to={`/channel/${id}/videos`}>Video</Link>
            </li>
            <li
              className={`${
                location.pathname === `/channel/${id}/descriptions`
                  ? "active"
                  : null
              } `}
            >
              <Link to={`/channel/${id}/descriptions`}>Giới thiệu</Link>
            </li>
          </ul>
        </div>

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
      {show && <ModalUpdateUser setShow={setShow} />}
    </>
  );
};

export default Channel;
