import React from "react";
import { useLocation, Link } from "react-router-dom";

const Navigation = ({ id }) => {
  const location = useLocation();
  return (
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
  );
};

export default Navigation;
