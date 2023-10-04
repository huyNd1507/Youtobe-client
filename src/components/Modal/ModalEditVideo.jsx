import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Overlay from "./Overlay";
import { editVideo } from "../../redux/slice/channelSlice";
import { uploadImg } from "../../utils/uploadImg";

const ModalEditVideo = ({ setShow, video }) => {
  const [data, setData] = useState(video);
  const [files, setFiles] = useState();
  const [previewThumnail, setPreviewThumnail] = useState(
    data?.videoThumnail
      ? data?.videoThumnail
      : data?.videoUrl?.replace(".mp4", ".jpg")
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditVideo = async (e) => {
    e.preventDefault();

    if (
      data.title === video.title &&
      data.description === video.description &&
      !files
    ) {
      return setShow(false);
    }

    if (!data.title.trim() || !data.description.trim()) {
      return toast.error("Không đc để trống các trường!");
    }

    if (data.title.trim().length > 100) {
      return toast.error(
        "Tiêu đề video ko đc vướt quá 76 kí tự và mô tả ko đc vượt quá 100 kí tự!"
      );
    }

    setLoading(true);

    if (!files) {
      dispatch(
        editVideo({
          id: video._id,
          data,
        })
      );
    }

    if (files) {
      const url = await uploadImg(files);
      dispatch(
        editVideo({
          id: video._id,
          data: {
            ...data,
            videoThumnail: url,
          },
        })
      );
    }

    setShow(false);
    setLoading(false);
    return toast.success("Chỉnh sửa video thành công!");
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewThumnail(preview);
    setFiles(file);
  };

  useEffect(() => {
    return () => {
      previewThumnail && URL.revokeObjectURL(previewThumnail);
    };
  }, [previewThumnail]);

  return (
    <>
      <Overlay setShow={setShow}>
        <div className="modal-box modal-video">
          <i setShow={setShow} class="bx bx-x box-icon "></i>
          <form onSubmit={handleEditVideo} onClick={(e) => e.stopPropagation()}>
            <div>
              <img alt="" src={previewThumnail} style={{ width: "100%" }} />
              <input type="file" onChange={onChangeFile} id="thumnail" />
            </div>
            <div className="content">
              <div>
                <label>Tiêu để</label>
                <input
                  type="text"
                  placeholder="Tiêu đề..."
                  value={data?.title}
                  name="title"
                  onChange={handleOnchange}
                />
              </div>
              <div>
                <label>Mô tả</label>
                <textarea
                  type="text"
                  placeholder="Mô tả..."
                  value={data?.description}
                  rows={5}
                  name="description"
                  onChange={handleOnchange}
                />
              </div>
              <button disabled={loading}>Đăng</button>
            </div>
          </form>
        </div>
      </Overlay>
    </>
  );
};

export default ModalEditVideo;
