import React, { useState } from "react";
import { toast } from "react-toastify";

import { calculateCreatedTime } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { deleteCommentApi } from "../../api/commentApi";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Spin } from "react-cssfx-loading";

const CommentList = ({ deleteComment, commentList, updateComment }) => {
  const { t } = useTranslation();

  const { currentUser } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [openCommentboxes, setOpenCommentboxes] = useState({});

  const handleEmojiClick = (emojiData) => {
    setEditedContent(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };

  const handleCancelEdit = () => {
    setEditComment(false);
    setOpenCommentboxes({});
  };

  const handleDelteComment = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhận xét!")) {
      setLoading(true);
      const res = await deleteCommentApi(id);
      if (res.data.success) {
        deleteComment(id);
        toast.success("Xóa nhận xét thành công!");
      } else {
        toast.error("Xóa nhận xét thất bại!");
      }
      setLoading(false);
    }
  };

  const handleUpdateComment = (commentId, updatedContent) => {
    try {
      setLoading(true);
      updateComment(commentId, updatedContent);
      setEditComment(false);
      setOpenCommentboxes({});
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật nhận xét!");
    } finally {
      setLoading(false);
      setShowEmojiPicker(false);
    }
  };

  const handleKeyDown = (e, commentId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdateComment(commentId, editedContent);
    }
  };

  return (
    <div className="comment-list">
      <h3>{t("homepage.comment")}</h3>

      {commentList.length > 0 ? (
        commentList?.map((data) => (
          <div className="comment-user" key={data._id}>
            <Link to={`/channel/${data?.userId?._id}`}>
              <img src={data?.userId?.avatar} alt="" />
            </Link>
            <div className="flex-1">
              <div className="d-flex">
                <Link to={`/channel/${data?.userId?._id}`}>
                  <p className="font-bold ">{data?.userId?.name}</p>
                </Link>
                <p>{calculateCreatedTime(data?.updatedAt)}</p>
              </div>

              {editComment ? (
                <form
                  className="form-editcomment"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateComment(data._id, editedContent);
                  }}
                >
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, data._id)}
                  />

                  <div className="flex-between">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <i style={{ color: "#000" }} className="bx bx-smile"></i>
                    </button>

                    <div>
                      <button onClick={handleCancelEdit}>Hủy</button>
                      <button disabled={loading}>
                        {loading ? <Spin /> : "Bình luận"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <p className="text-content">{data?.content}</p>
              )}
            </div>

            {currentUser?._id === data?.userId?._id && (
              <>
                <div className="comment-menu">
                  <div
                    className="box-menu"
                    onClick={() =>
                      setOpenCommentboxes((prevOpenCommentboxes) => ({
                        ...prevOpenCommentboxes,
                        [data._id]: !prevOpenCommentboxes[data._id],
                      }))
                    }
                  >
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </div>

                  {openCommentboxes[data._id] && (
                    <div className="comment-box">
                      <span
                        onClick={() => {
                          setEditComment(true);
                          setOpenCommentboxes({});
                          setEditedContent(data?.content);
                        }}
                      >
                        Sửa
                      </span>
                      <span onClick={() => handleDelteComment(data?._id)}>
                        Xóa
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>{t("homepage.there are currently no comments")}</p>
      )}

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
      )}
    </div>
  );
};

export default CommentList;
