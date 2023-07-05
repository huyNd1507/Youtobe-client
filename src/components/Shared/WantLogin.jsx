import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Shared.scss";

const WantLogin = () => {
  const location = useLocation();

  return (
    <div className="want-login">
      <div className="box">
        <p> Cần đăng nhập để vào trang này</p>
        <Link to={`/login?redirect=${encodeURIComponent(location.pathname)}`}>
          <button>Đăng nhập ngay</button>
        </Link>
      </div>
    </div>
  );
};

export default WantLogin;
