import React, { useState } from "react";
import { toast } from "react-toastify";

import { calculateCreatedTime } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { deleteCommentApi } from "../../api/commentApi";

const CommentList = ({ deleteComment, commentList }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

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

  return (
    <div className="comment-list">
      <h3>Nhận xét</h3>
      {commentList.length > 0 ? (
        commentList.map((data) => (
          <div className="comment-user" key={data._id}>
            <img src={data?.userId?.avatar} alt="" />
            <div>
              <div className="d-flex">
                <p className="font-bold ">{data?.userId?.name}</p>
                <p>{calculateCreatedTime(data?.createdAt)}</p>
              </div>
              <p className="text-content">{data?.content}</p>
            </div>
            {currentUser?._id === data?.userId?._id && (
              <i
                onClick={() => handleDelteComment(data?._id)}
                className={`bx bxs-comment-x ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              ></i>
            )}
          </div>
        ))
      ) : (
        <p>Hiện tại không có bình luận nào</p>
      )}
    </div>
  );
};

export default CommentList;
