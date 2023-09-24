import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../image/instagram-stories.png";
import { useTranslation } from "react-i18next";

import "./Header.scss";
import { locales } from "../../i18n";
import { logOut } from "../../redux/slice/authSlice";

const Header = ({ setShow, show, theme, setTheme }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language];
  console.log("currentLanguage: ", currentLanguage);

  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShow(!show);
  };

  const showNavbarUser = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSearchChange = (e) => {
    setText(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    navigate(`/search?type=video&q=${text}`);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="header">
      <div className="logo left">
        <i className="bx bx-menu box-icon" onClick={toggleMenu}></i>
        <Link to="/">
          <img src={logo} alt="" />

          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/4406/4406111.png"
            alt=""
          /> */}
        </Link>
      </div>

      <div className="search center">
        <form onSubmit={handelSubmit}>
          <input
            value={text}
            type="text"
            placeholder={t("homepage.search")}
            onChange={handleSearchChange}
          />
          <button>
            <i className="bx bx-search box-icon"></i>
          </button>
        </form>
      </div>

      <div className="right">
        {/* <div>
          <button className="btn" onClick={() => changeLanguage("vi")}>
            Tiếng Việt
          </button>
          <button className="btn" onClick={() => changeLanguage("en")}>
            Tiếng Anh
          </button>
        </div> */}

        <div className="upload">
          <Link to="/upload">
            <i className="bx bx-upload box-icon"></i>
          </Link>
        </div>

        <div className="search-mobile">
          <i className="bx bx-search"></i>
        </div>

        {currentUser ? (
          <>
            <div className="notification">
              <i className="bx bx-bell"></i>
              <div className="notification-popup"></div>
            </div>
            <div className="User-avatar" onClick={showNavbarUser}>
              <img src={currentUser.avatar} alt={currentUser.name} />
            </div>
            <div
              className={showNavbar ? "user-login toogle" : "user-login"}
              onClick={showNavbarUser}
            >
              <div className="User-avatar user-popup">
                <img src={currentUser.avatar} alt={currentUser.name} />
                <div className="user-info">
                  <p>{currentUser?.name}</p>
                  <p>{currentUser?.email}</p>
                </div>
              </div>
              <ul>
                <li>
                  <i class="bx bx-user-circle icon"></i>
                  <Link to={`/channel/${currentUser._id}`}>Kênh của bạn</Link>
                </li>
                <li className="flex-between">
                  <span>
                    <i class="bx bx-moon icon"></i> Chế độ tối
                  </span>
                  <div
                    className={`theme-toggle ${
                      theme === "light" ? "light" : "dark"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="checkbox"
                      onChange={switchTheme}
                      checked={theme === "dark"}
                    />
                    <label htmlFor="checkbox" className="checkbox-label">
                      <i
                        className={`bx toggle-icon ${
                          theme === "light" ? "bxs-sun" : "bxs-moon"
                        }`}
                      ></i>
                      <span className="ball"></span>
                    </label>
                  </div>
                </li>
                <li className="flex-between">
                  <span>
                    <i class="bx bx-captions icon"></i> Ngôn ngữ
                  </span>
                  <span>
                    <i class="bx bx-chevron-right"></i>
                  </span>
                </li>
                <li
                  onClick={() => {
                    dispatch(logOut());
                  }}
                >
                  <i class="bx bx-log-out icon"></i>
                  Đăng xuất
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn">{t("homepage.login")}</button>
            </Link>
          </>
        )}

        <div></div>
      </div>
    </header>
  );
};

export default Header;
