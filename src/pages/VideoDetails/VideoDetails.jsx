import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./VideoDetails.scss";
import {
  getVideoById,
  clearVideo,
  checkDisLikeVideo,
  checkLike,
  setIsDisLike,
  setIsLike,
} from "../../redux/slice/videoSlice";
import { getCommentApi, updateCommentApi } from "../../api/commentApi";
import { descViewApi } from "../../api/videoApi";
import Notfound from "../../pages/Notfound/Notfound";
import Title from "../../components/Shared/Title";
import VideoInfoWriter from "../../components/Video/VideoInfoWriter";
import VideoPlayer from "../../components/Video/VideoPlayer";
import VideoInfo from "../../components/Video/VideoInfo";
import InputComment from "../../components/Comment/InputComment";
import CommentList from "../../components/Comment/CommentList";
import VideoRecommentItem from "../../components/Video/VideoRecommentItem";
import { addVideoLocal } from "../../utils/localStrorage";
import { calculateCreatedTime } from "../../utils/formatDate";
import { useTranslation } from "react-i18next";

const VideoDetails = () => {
  const { video, videoRecomment, likeCount, disLikeCount, error } = useSelector(
    (state) => state.video
  );

  // console.log("video: ", video);
  const { currentUser } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [commentList, setCommentList] = useState([]);
  const [showAllDesc, setShowAllDesc] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const addComment = (comment) => {
    setCommentList([...commentList, comment]);
  };

  const deleteComment = (id) => {
    const newListComment = commentList.filter((p) => p._id !== id);
    setCommentList(newListComment);
  };

  const updateComment = async (commentId, updatedContent) => {
    try {
      const res = await updateCommentApi(commentId, {
        content: updatedContent,
      });
      if (res.data.success) {
        const updatedCommentList = commentList.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: updatedContent }
            : comment
        );
        setCommentList(updatedCommentList);
        toast.success("Cập nhật nhận xét thành công!");
      } else {
        toast.error("Cập nhật nhận xét thất bại!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật nhận xét!");
    }
  };

  useEffect(() => {
    (async (videoId) => {
      try {
        const res = await getCommentApi(videoId);
        if (res.data.success) {
          setCommentList(res.data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    dispatch(getVideoById(id));

    return () => {
      dispatch(clearVideo());
    };
  }, [id, dispatch]);

  useEffect(() => {
    const CheckLike = () => {
      if (!currentUser) return dispatch(setIsLike(false));
    };
    CheckLike();
    dispatch(checkLike(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    const CheckDislike = () => {
      if (!currentUser) return dispatch(setIsDisLike(false));
    };
    CheckDislike();
    dispatch(checkDisLikeVideo(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    if (video._id) {
      addVideoLocal({
        ...video,
        viewAt: Date.now(),
      });
    }
  }, [video]);

  useEffect(() => {
    descViewApi(id);
  }, [id]);

  if (error) return <Notfound />;

  return (
    <div className="video-details">
      <Title title={`${video?.title} | Youtube`} />
      <div className="video-details-left">
        {video?.videoUrl && (
          <VideoPlayer videoId={video?._id} url={video?.videoUrl} />
        )}
        <div className="video-info">
          <h1>
            {video?.title?.length > 100
              ? video?.title?.slice(0, 100) + "..."
              : video?.title}
          </h1>

          <div className="video-box">
            <VideoInfo video={video} />
            <VideoInfoWriter
              likeCount={likeCount}
              disLikeCount={disLikeCount}
              video={video}
            />
          </div>
          <div className="video-des">
            <div className=" d-flex">
              <p className="m-right font-bold">
                {video?.totalView} {t("homepage.view")}
              </p>
              <p className="font-bold">
                {calculateCreatedTime(video?.createdAt)}
              </p>
            </div>
            <p
              className={`text-line-clamp ${
                showAllDesc ? "line-clamp-50 " : "line-clamp-2 "
              } `}
            >
              {video?.description}
            </p>
            <p
              onClick={() => setShowAllDesc(!showAllDesc)}
              className="cursor-pointer"
            >
              {showAllDesc ? t("homepage.hide less") : t("homepage.see more")}
            </p>
          </div>
        </div>
        <InputComment addComment={addComment} />
        <CommentList
          deleteComment={deleteComment}
          commentList={commentList}
          updateComment={updateComment}
        />
      </div>
      <div className="video-recomment">
        {videoRecomment.length > 1 ? (
          videoRecomment
            ?.filter((data) => data._id !== id)
            .map((data) => <VideoRecommentItem key={data._id} data={data} />)
        ) : (
          <div className="flex items-center justify-center py-2">
            No Videos Recomment!
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
