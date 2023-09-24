import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

import { postCommentApi } from "../../api/commentApi";
import { useTranslation } from "react-i18next";

const InputComment = ({ addComment }) => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
          <>
            <img src={currentUser?.avatar} alt="" />
            <input
              placeholder={t("homepage.write a comment")}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <i style={{ color: "#000" }} class="bx bx-smile box-icon"></i>
            </button>
            {/* {selectedEmoji ? <Emoji unified={selectedEmoji} size={30} /> : null} */}
            <button style={{ color: "#000" }} disabled={loading}>
              {loading ? "Đang gửi" : "Gửi"}
            </button>
          </>
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
