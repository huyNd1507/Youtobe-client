import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Sidebar.scss";
import { logOut } from "../../redux/slice/authSlice";
import { getChannelSubsrciptionApi } from "../../api/channelApi";
import { useTranslation } from "react-i18next";

const Sidebar = ({ show, setShow }) => {
  const { t } = useTranslation();
  const toggleMenu = () => {
    setShow(!show);
  };

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [subChannel, setSubChannel] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setShow(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const res = await getChannelSubsrciptionApi();
        if (res.data.success) {
          setSubChannel(res.data.subsrciption);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser]);

  return (
    <>
      <div className={show ? "side-bar actives" : "side-bar "}>
        <div className="nav">
          <NavLink className="nav-link " to="/" onClick={toggleMenu}>
            <i className="bx bx-home box-icon"></i>
            <span>{t("homepage.home")}</span>
          </NavLink>

          <NavLink className="nav-link " to="/trending" onClick={toggleMenu}>
            <i className="bx bxs-hot box-icon"></i>
            <span>{t("homepage.trending")}</span>
          </NavLink>

          <NavLink
            className="nav-link "
            to="subsrciptions"
            onClick={toggleMenu}
          >
            <i className="bx bxs-videos box-icon"></i>
            <span>{t("homepage.registered")}</span>
          </NavLink>

          <NavLink className="nav-link " to="favouites" onClick={toggleMenu}>
            <i className="bx bxs-movie-play box-icon"></i>
            <span>{t("homepage.favorite videos")}</span>
          </NavLink>

          <NavLink className="nav-link " to="history" onClick={toggleMenu}>
            <i className="bx bx-history box-icon"></i>
            <span>{t("homepage.video viewed")}</span>
          </NavLink>

          <NavLink className="nav-link " to="liked-video" onClick={toggleMenu}>
            <i className="bx bxs-like box-icon"></i>
            <span>{t("homepage.liked video")}</span>
          </NavLink>

          {currentUser && (
            <>
              {subChannel.length > 0 && (
                <div className="channel-sub">
                  <h1>{t("homepage.subscribed channel")}</h1>
                  {subChannel.map((data) => (
                    <Link
                      to={`/channel/${data?.channelId?._id}/videos`}
                      key={data._id}
                    >
                      <div className="channel-sub-user">
                        <img src={data?.channelId?.avatar} alt="" />
                        <span>{data?.channelId?.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {show && <div className="modal-sidebar" onClick={toggleMenu}></div>}
    </>
  );
};

export default Sidebar;
