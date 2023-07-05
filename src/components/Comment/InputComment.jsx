import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { postCommentApi } from "../../api/commentApi";

const InputComment = ({ addComment }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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
              placeholder="Viết bình luận"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button disabled={loading}> {loading ? "Đang gửi" : "Gửi"}</button>
          </>
        ) : (
          <p>
            Cần phải
            <Link
              className="font-bold"
              to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            >
              đăng nhập
            </Link>
            để comment
          </p>
        )}
      </form>
    </>
  );
};

export default InputComment;
