import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FacebookShareButton,
  EmailShareButton,
  FacebookIcon,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import {
  addVideoFavourite,
  deleteVideoFavourite,
  getVideoFavourite,
} from "../../redux/slice/videoFavouriteSlice";
import {
  likeVideo,
  unLike,
  disLikeVideo,
  unDisLikeVideo,
} from "../../redux/slice/videoSlice";
import ModalAuth from "../Modal/ModalAuth";
import Notfound from "../../pages/Notfound/Notfound";

const VideoInfoWriter = ({ likeCount, disLikeCount, video }) => {
  const { videos, loading, error } = useSelector((state) => state.favourite);
  const { isLike, isDisLike } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [shareBox, setShareBox] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentURL = location.pathname;
  console.log("currentURL: ", currentURL);

  const { id } = useParams();

  const handleLike = () => {
    if (!currentUser) return setShowModal(true);
    if (isLike) {
      dispatch(unLike(id));
    } else {
      if (isDisLike) {
        dispatch(likeVideo({ videoId: id }));
        dispatch(unDisLikeVideo(id));
        return;
      }
      dispatch(likeVideo({ videoId: id }));
    }
  };

  const handleDisLike = () => {
    if (!currentUser) return setShowModal(true);
    if (isDisLike) {
      dispatch(unDisLikeVideo(id));
    } else {
      if (isLike) {
        dispatch(disLikeVideo({ videoId: id }));
        dispatch(unLike(id));
        return;
      }
      dispatch(disLikeVideo({ videoId: id }));
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    dispatch(getVideoFavourite());
  }, [currentUser, dispatch]);

  const handleAddVideoFavourite = () => {
    if (!currentUser) return setShowModal(true);
    const check = videos.some((p) => p._id === video?._id);
    if (check) {
      const confirm = window.confirm(
        "Bạn muốn xóa video này ra khỏi danh sách yêu thích!"
      );
      if (confirm) {
        dispatch(deleteVideoFavourite(video?._id));
        toast.success("Video đã được xóa khỏi danh sách!");
        return;
      }
      return;
    }
    dispatch(addVideoFavourite(video));
    toast.success("Video đã được thêm vào danh sách!");
  };

  if (error) return <Notfound />;
  return (
    <>
      <div className="video-action">
        <div className="video-like">
          <button onClick={handleLike}>
            <i className={`bx ${isLike ? "bxs-like" : "bx-like"}`}></i>
            <span>{likeCount}</span>
          </button>
          <button onClick={handleDisLike}>
            <i className={`bx ${isDisLike ? "bxs-dislike" : "bx-dislike"}`}></i>
            <span>{disLikeCount}</span>
          </button>
        </div>
        <div className="video-like">
          <button
            disabled={loading}
            className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleAddVideoFavourite}
          >
            <i
              className={`${
                videos.some((data) => data._id === video?._id)
                  ? "bx bx-list-check"
                  : "bx bx-list-plus"
              } box-icon`}
            ></i>
          </button>
        </div>

        <div className="video-like">
          <button onClick={() => setShareBox(!shareBox)}>
            <i className="bx bx-share"></i>
          </button>

          {shareBox && (
            <>
              <div className="share-box" onClick={() => setShareBox(!shareBox)}>
                <FacebookShareButton
                  url={`https://h-tobe-clone.vercel.app/details/${video?._id}`}
                  quote={"Dummy text!"}
                  hashtag="#youtube clone"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <EmailShareButton
                  url={`https://h-tobe-clone.vercel.app/details/${video?._id}`}
                  quote={"Dummy text!"}
                  hashtag="#muo"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <TelegramShareButton
                  url={`https://h-tobe-clone.vercel.app/details/${video?._id}`}
                  quote={"Dummy text!"}
                  hashtag="#muo"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <TwitterShareButton
                  url={`https://h-tobe-clone.vercel.app/details/${video?._id}`}
                  quote={"Dummy text!"}
                  hashtag="#muo"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div
                className="modal-share"
                onClick={() => setShareBox(!shareBox)}
              ></div>
            </>
          )}
        </div>
      </div>
      {showModal && <ModalAuth setShow={setShowModal} />}
    </>
  );
};

export default VideoInfoWriter;
