import React from "react";
import { Link } from "react-router-dom";
import { calculateCreatedTime } from "../../utils/formatDate";

const VideoRecommentItem = ({ data }) => {
  return (
    <Link to={`/details/${data._id}`}>
      <div className="video-recomment-item" key={data._id}>
        <div className="video-avatar">
          <img
            src={
              data?.videoThumnail
                ? data?.videoThumnail
                : data?.videoUrl?.replace(".mp4", ".jpg")
            }
            alt=""
          />
        </div>

        <div className="video-content">
          <h1 className="text-line-clamp">{data?.title}</h1>
          <span>{data?.writer?.name}</span>
          <span>
            {data?.totalView} lượt xem • {calculateCreatedTime(data.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoRecommentItem;
