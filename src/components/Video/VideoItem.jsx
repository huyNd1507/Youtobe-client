import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteVideo } from "../../redux/slice/channelSlice";

import { calculateCreatedTime } from "../../utils/formatDate";
import ModalEditVideo from "../Modal/ModalEditVideo";

const VideoItem = ({ data, edit }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteVideo = () => {
    if (window.confirm("Bạn chắc chắn muốn xóa video này")) {
      dispatch(deleteVideo(data?._id));
      toast.success("Xóa video thành công!");
    }
  };
  return (
    <>
      <div>
        <div className="video">
          <div className="thumbnail">
            <Link to={`/details/${data?._id}`}>
              <img
                src={
                  data?.videoThumnail
                    ? data?.videoThumnail
                    : data?.videoUrl?.replace(".mp4", ".jpg")
                }
                alt=""
              />
            </Link>
            {edit && (
              <div className="video-action">
                <i
                  onClick={() => setShow(true)}
                  className="bx bxs-edit-alt box-icon"
                ></i>
                <i
                  onClick={handleDeleteVideo}
                  className="bx bxs-message-square-x box-icon"
                ></i>
              </div>
            )}
          </div>

          <div className="details">
            <div className="author">
              <Link to={`/channel/${data?.writer?._id}`}>
                <img src={data?.writer?.avatar} alt={data?.writer?.name} />
              </Link>
            </div>
            <div className="title">
              <Link to={`/details/${data?._id}`}>
                <h3 className="text-line-clamp"> {data?.title}</h3>
              </Link>
              <span>{data?.writer?.name}</span>
              <span>
                {data?.totalView} lượt xem •{" "}
                {calculateCreatedTime(data.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {show && <ModalEditVideo video={data} setShow={setShow} />}
    </>
  );
};

export default VideoItem;
