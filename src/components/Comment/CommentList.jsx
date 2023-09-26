import React, { useState } from "react";
import { toast } from "react-toastify";

import { calculateCreatedTime } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { deleteCommentApi } from "../../api/commentApi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CommentList = ({ deleteComment, commentList }) => {
  const { t } = useTranslation();
  console.log("commentlist: ", commentList);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  console.log("currentUser: ", currentUser);

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
      <h3>{t("homepage.comment")}</h3>
      {commentList.length > 0 ? (
        commentList?.map((data) => (
          <div className="comment-user" key={data._id}>
            <Link to={`/channel/${data?.userId?._id}`}>
              <img src={data?.userId?.avatar} alt="" />
            </Link>
            <div style={{ flex: "1" }}>
              <div className="d-flex">
                <Link to={`/channel/${data?.userId?._id}`}>
                  <p className="font-bold ">{data?.userId?.name}</p>
                </Link>
                <p>{calculateCreatedTime(data?.createdAt)}</p>
              </div>
              <p className="text-content">{data?.content}</p>
            </div>
            {currentUser?._id === data?.userId?._id && (
              <i
                onClick={() => handleDelteComment(data?._id)}
                className={`bx bx bx-x ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              ></i>
              // <i class='bx bx-x'></i>
            )}
          </div>
        ))
      ) : (
        <p>{t("homepage.there are currently no comments")}</p>
      )}
    </div>
  );
};

export default CommentList;
