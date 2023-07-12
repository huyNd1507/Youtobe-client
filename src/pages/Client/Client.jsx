import React, { useState, Fragment } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Video from "../../components/Video/Video";
import { Route, Routes } from "react-router-dom";
import Uploadvideo from "../Upload/Uploadvideo";
import VideoDetails from "../VideoDetails/VideoDetails";
import Subsrciption from "./Subsrciption";
import Trending from "./Trending";
import Search from "../Search/Search";
import Favourite from "./Favourite";
import LikeVideo from "./LikeVideo";
import HistoryVideo from "./HistoryVideo";
import Channel from "../Channel/Channel";
import Notfound from "../Notfound/Notfound";
import Home from "./Home";

import "../../App.css";

import useLocalStorage from "use-local-storage";

const Client = () => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  return (
    <div data-theme={theme}>
      <Header setShow={setShow} show={show} theme={theme} setTheme={setTheme} />
      <main>
        <Sidebar show={show} setShow={setShow} />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="upload" element={<Uploadvideo />} />
            <Route path="details/:id" element={<VideoDetails />} />
            <Route path="subsrciptions" element={<Subsrciption />} />
            <Route path="trending" element={<Trending />} />
            <Route path="search" element={<Search />} />
            <Route path="favouites" element={<Favourite />} />
            <Route path="liked-video" element={<LikeVideo />} />
            <Route path="history" element={<HistoryVideo />} />
            <Route path="channel/:id/*" element={<Channel />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Client;
