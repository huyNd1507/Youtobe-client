import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  checkSubsrciption,
  getSubsrciption,
  setSubsrciptions,
  subsrciptionChannel,
  unSubsrciption,
} from "../../redux/slice/subsrciptionSlice";
import Notfound from "../../pages/Notfound/Notfound";
import ModalAuth from "../Modal/ModalAuth";

const VideoInfo = ({ video }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { subsrciptCount, isSubsrciption, error, isCheck } = useSelector(
    (state) => state.sub
  );
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!video?.writer?._id) return;

    dispatch(getSubsrciption(video?.writer?._id));
  }, [video?.writer?._id, dispatch]);

  useEffect(() => {
    const CheckSub = () => {
      if (!currentUser || !video?.writer?._id)
        return dispatch(setSubsrciptions(false));
    };
    CheckSub();
    dispatch(checkSubsrciption(video?.writer?._id));
  }, [currentUser, video?.writer?._id, dispatch]);

  const handleSubsrciption = () => {
    if (!currentUser) return setShow(true);
    if (isSubsrciption) {
      if (window.confirm("Bạn muốn hủy đăng ký!")) {
        dispatch(unSubsrciption(video?.writer?._id));
      }
    } else {
      dispatch(subsrciptionChannel({ channelId: video?.writer?._id }));
    }
  };

  if (error) return <Notfound />;

  return (
    <>
      <div className="video-author">
        <div className="video-img">
          <Link to={`/channel/${video?.writer?._id}`}>
            <img src={video?.writer?.avatar} alt="" />
          </Link>
        </div>
        <div className="info-user">
          <Link to={`/channel/${video?.writer?._id}`}>
            <h2> {video?.writer?.name}</h2>
          </Link>
          <p> {subsrciptCount} người đăng ký</p>
        </div>

        {currentUser?._id !== video?.writer?._id && (
          <button onClick={handleSubsrciption} disabled={isCheck}>
            {isSubsrciption ? "Đã đăng ký" : "Đăng ký"}
          </button>
        )}
      </div>
      {show && <ModalAuth setShow={setShow} />}
    </>
  );
};

export default VideoInfo;
