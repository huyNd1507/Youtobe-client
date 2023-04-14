import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./UploadVideo.scss";
import { cloudinaryUrl } from "../../utils/cloudinaryApi";
import { uploadVideoApi } from "../../api/videoApi";
import WantLogin from "../../components/Shared/WantLogin";

const Uploadvideo = () => {
  const [file, setFile] = useState();
  const [previewVideo, setPreviewVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleOnchangeFile = (e) => {
    const file = e.target.files[0];
    if (file?.type !== "video/mp4")
      return toast.error("Vui lòng chọn file định dạng video mp4!");
    if (file?.size / 1024 / 1024 > 30)
      return toast.error("Dung lượng file phải bé hơn 30mb!");

    const preview = URL.createObjectURL(file);
    setPreviewVideo(preview);
    setFile(e.target.files[0]);
  };

  const handleChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      previewVideo && URL.revokeObjectURL(previewVideo);
    };
  }, [previewVideo]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!data.title.trim() || !data.description.trim())
      return toast.error("Không được để trống các trường!");
    if (data.title.trim().length > 100)
      return toast.error("Tiêu đề video không được dài quá 100 kí tự!");
    if (!file) return toast.error("Bạn chưa chọn video nào!");

    URL.revokeObjectURL(previewVideo);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);

      const toastId = toast.loading("Upload...", { position: "top-right" });

      const res = await axios.post(cloudinaryUrl, formData, {
        onUploadProgress: (p) => {
          const { loaded, total } = p;
          let percent = Math.floor((loaded * 100) / total);
          toast.loading(`Upload video ${percent}`, { toastId: toastId });
        },
      });

      const newVideo = {
        ...data,
        videoUrl: res.data.url,
      };

      const uploadVideo = await uploadVideoApi(newVideo);

      toast.dismiss(toastId);

      if (uploadVideo.data.success) {
        navigate(`/details/${uploadVideo.data.video?._id}`);
        toast.success(uploadVideo.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("upload video fail!");
    }
    setLoading(false);
  };
  
  return (
    <div className="upload-video">
      {currentUser ? (
        <form onSubmit={handleSubmitForm}>
          <div className="file-video">
            <div className="file-info">
              <i className="bx bxs-cloud-upload box-icon"></i>
              <span>Chọn video để tải lên</span>
              <span>Mp4, x-m4v</span>
              <span>Nhở hơn 30 MB</span>
              <input
                type="file"
                id="file-upload"
                onChange={handleOnchangeFile}
                accept="video/mp4,video/x-m4v,video/*"
              />
            </div>
            {previewVideo && <video src={previewVideo} controls />}
          </div>
          <div className="content">
            <div>
              <label>Tiêu để</label>
              <input
                type="text"
                placeholder="Tiêu đề..."
                name="title"
                onChange={handleChangeInput}
                value={data.title}
              />
            </div>
            <div>
              <label>Mô tả</label>
              <textarea
                type="text"
                placeholder="Mô tả..."
                name="description"
                rows={7}
                value={data.description}
                onChange={handleChangeInput}
              />
            </div>
            <button disabled={loading}>Đăng</button>
          </div>
        </form>
      ) : (
        <WantLogin />
      )}
    </div>
  );
};

export default Uploadvideo;
