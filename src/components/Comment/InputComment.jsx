import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { Spin } from "react-cssfx-loading";

import { postCommentApi } from "../../api/commentApi";
import { useTranslation } from "react-i18next";

const InputComment = ({ addComment }) => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleCancelClick = () => {
    setText("");
  };

  const handleEmojiClick = (emojiData) => {
    setText(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  };

  const location = useLocation();
  const { id } = useParams();

  const handlePostComment = async (e, newComment) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await postCommentApi(newComment);
      if (res.data.success) {
        addComment(res.data.comment);
      }
      setText("");
    } catch (error) {
      console.log(error);
      toast.error("Thêm comment thất bại!");
    }
    setLoading(false);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostComment(e, {
        videoId: id,
        userId: currentUser?._id,
        content: text,
      });
    }
  };

  return (
    <>
      <form
        className="comment"
        onSubmit={(e) =>
          handlePostComment(e, {
            videoId: id,
            userId: currentUser._id,
            content: text,
          })
        }
      >
        {currentUser ? (
          <div className="d-flex  w-100">
            <div>
              <img src={currentUser?.avatar} alt="" />
            </div>
            <div className="flex-1 ">
              <input
                placeholder={t("homepage.write a comment")}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
              />

              {isInputFocused && (
                <div className="flex-between">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <i style={{ color: "#000" }} className="bx bx-smile"></i>
                  </button>

                  <div>
                    <button onClick={handleCancelClick}>Hủy</button>
                    <button type="submit" disabled={loading}>
                      {loading ? <Spin /> : "Bình luận"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>
            Cần phải
            <Link
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                fontWeight: "bold",
              }}
              to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            >
              {t("homepage.login")}
            </Link>
            để comment
          </p>
        )}
      </form>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          autoFocusSearch={false}
          emojiStyle={EmojiStyle.NATIVE}
        />
      )}
    </>
  );
};

export default InputComment;
