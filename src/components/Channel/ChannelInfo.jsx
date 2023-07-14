import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useParams, Route, useLocation, Link } from "react-router-dom";
import Navigation from "./Navigation";
import ModalUpdateUser from "../Modal/ModalUpdateUser";
import {
  checkSubsrciption,
  setSubsrciptions,
  subsrciptionChannel,
  unSubsrciption,
  getSubsrciption,
} from "../../redux/slice/subsrciptionSlice";
import ModalAuth from "../Modal/ModalAuth";

const ChannelInfo = ({ profile }) => {
  const [show, setShow] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { isSubsrciption, subsrciptCount } = useSelector((state) => state.sub);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleSubsrciption = () => {
    if (!currentUser) return setShowModalAuth(true);
    if (isSubsrciption) {
      if (window.confirm("Bạn muốn hủy đăng ký!")) {
        dispatch(unSubsrciption(profile?._id));
      }
    } else {
      dispatch(subsrciptionChannel({ channelId: profile?._id }));
    }
  };

  useEffect(() => {
    const CheckSub = () => {
      if (!currentUser) return dispatch(setSubsrciptions(false));
      if (currentUser._id === profile?._id) return;
      if (!profile?._id) return;
    };
    CheckSub();
    dispatch(checkSubsrciption(profile?._id));
  }, [id, currentUser, profile?._id, dispatch]);

  useEffect(() => {
    if (!profile?._id) return;
    dispatch(getSubsrciption(profile?._id));
  }, [profile?._id, dispatch]);

  return (
    <>
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
            <button onClick={handleSubsrciption}>
              {isSubsrciption ? "Đã đăng ký" : "Đăng ký"}
            </button>
          ) : (
            <button onClick={() => setShow(true)}>Tùy chỉnh kênh</button>
          )}
        </div>
      </div>
      <Navigation id={profile?._id} />
      {show && <ModalUpdateUser setShow={setShow} />}
      {showModalAuth && <ModalAuth setShow={setShowModalAuth} />}
    </>
  );
};

export default ChannelInfo;
