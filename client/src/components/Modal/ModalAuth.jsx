import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Modal.scss";
import Overlay from "./Overlay";

const ModalAuth = ({ setShow }) => {
  const location = useLocation();

  return (
    <Overlay setShow={setShow}>
      <div className="modal-box">
        <h1>Youtobe</h1>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        >
          <button>Đăng nhập ngay</button>
        </Link>

        <p>
          Nếu chưa có tài khoản hãy
          <Link
            className="text-blue "
            to={`/register?redirect=${encodeURIComponent(location.pathname)}`}
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </Overlay>
  );
};

export default ModalAuth;
