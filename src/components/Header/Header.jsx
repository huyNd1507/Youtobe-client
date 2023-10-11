import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../image/instagram-stories.png";
import { useTranslation } from "react-i18next";

import "./Header.scss";
import { locales } from "../../i18n";
import { logOut } from "../../redux/slice/authSlice";

const Header = ({ setShow, show, theme, setTheme }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language];

  const [text, setText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLanguageClick = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setShowNavbar(!showNavbar);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setShowLanguageMenu(false);
  };

  const handleBackButtonClick = () => {
    setShowLanguageMenu(false);
    setShowNavbar(true);
  };

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShow(!show);
  };

  const handleSearchChange = (e) => {
    setText(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    navigate(`/search?type=video&q=${text}`);
    setSearchOpen(false);
    setText("");
  };

  return (
    <header className="header">
      <div className="logo left">
        <i className="bx bx-menu box-icon" onClick={toggleMenu}></i>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="search center search-destop">
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

      {searchOpen && (
        <>
          <div
            className="search-modal"
            onClick={() => setSearchOpen(!searchOpen)}
          ></div>
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
        </>
      )}

      <div className="right">
        <div className="upload">
          <Link to="/upload">
            <i className="bx bx-upload box-icon"></i>
          </Link>
        </div>

        <div
          className="search-mobile"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <i className="bx bx-search"></i>
        </div>

        {/* {currentUser && (
          <div className="notification">
            <i className="bx bx-bell"></i>
            <div className="notification-popup"></div>
          </div>
        )} */}

        {currentUser ? (
          <div
            className="User-avatar"
            onClick={() => {
              if (!showLanguageMenu) {
                setShowNavbar(!showNavbar);
              }
            }}
          >
            <img src={currentUser.avatar} alt={currentUser.name} />
          </div>
        ) : (
          <div
            onClick={() => {
              if (!showLanguageMenu) {
                setShowNavbar(!showNavbar);
              }
            }}
            className="ellipsis-menu"
          >
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>
        )}

        {showNavbar && (
          <div className="user-login">
            {currentUser ? (
              <div className="User-avatar user-popup">
                <Link
                  onClick={() => setShowNavbar(!showNavbar)}
                  to={`/channel/${currentUser._id}/videos`}
                  style={{ display: "flex" }}
                >
                  <img src={currentUser.avatar} alt={currentUser.name} />
                  <div className="user-info">
                    <p>{currentUser?.name}</p>
                    <p>{currentUser?.email}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn">{t("homepage.login")}</button>
              </Link>
            )}
            <ul>
              {currentUser && (
                <li>
                  <i className="bx bx-user-circle icon"></i>
                  <Link
                    onClick={() => setShowNavbar(!showNavbar)}
                    to={`/channel/${currentUser._id}/videos`}
                  >
                    Kênh của bạn
                  </Link>
                </li>
              )}

              <li className="flex-between">
                <span>
                  <i className="bx bx-moon icon"></i> Chế độ tối
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
                    onClick={() => setShowNavbar(!showNavbar)}
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

              <li className="flex-between" onClick={handleLanguageClick}>
                <span>
                  <i className="bx bx-captions icon"></i> {currentLanguage}
                </span>
                <span>
                  <i className="bx bx-chevron-right"></i>
                </span>
              </li>

              {currentUser && (
                <li
                  onClick={() => {
                    dispatch(logOut());
                    setShowNavbar(false);
                  }}
                >
                  <i className="bx bx-log-out icon"></i>
                  Đăng xuất
                </li>
              )}
            </ul>
          </div>
        )}

        {!showNavbar && (
          <div className="user-login box-language">
            {showLanguageMenu && (
              <div className="submenu">
                <button className="back-button" onClick={handleBackButtonClick}>
                  <i className="bx bx-chevron-left box-icon"></i>Ngôn ngữ
                </button>
                <ul>
                  <li onClick={() => changeLanguage("en")}>Tiếng Anh</li>
                  <li onClick={() => changeLanguage("vi")}>Tiếng Việt</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
