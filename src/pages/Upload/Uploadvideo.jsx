import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./UploadVideo.scss";
import { cloudinaryUrl } from "../../utils/cloudinaryApi";
import { uploadVideoApi } from "../../api/videoApi";
import WantLogin from "../../components/Shared/WantLogin";
import Title from "../../components/Shared/Title";

const Uploadvideo = () => {
  const [file, setFile] = useState();
  const [previewVideo, setPreviewVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    tags: "",
    isPublic: true,
  });
  const { currentUser } = useSelector((state) => state.auth);
  const [percent, setPercent] = useState(0);

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

    if (!data.title.trim() || !data.description.trim() || !data.tags.trim()) {
      return toast.error("Không được để trống các trường!");
    }
    if (data.title.trim().length > 100) {
      return toast.error("Tiêu đề video không được dài quá 100 kí tự!");
    }
    if (!file) return toast.error("Bạn chưa chọn video nào!");

    URL.revokeObjectURL(previewVideo);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_KEY);
      formData.append("tags", data.tags);
      formData.append("isPublic", data.isPublic);

      // Hiển thị Toast và lưu toastId vào state
      const toastId = toast.loading("Đang tải lên video 1%", {
        position: "bottom-right",
      });
      setPercent(1); // Bắt đầu từ 1%

      const res = await axios.post(cloudinaryUrl, formData, {
        onUploadProgress: (p) => {
          const { loaded, total } = p;
          const newPercent = Math.floor((loaded * 100) / total);
          setPercent(newPercent);
          toast.update(toastId, {
            render: `Đang tải lên video ${newPercent}%`,
          });
        },
      });

      const newVideo = {
        ...data,
        videoUrl: res.data.url,
      };

      const uploadVideo = await uploadVideoApi(newVideo);

      if (uploadVideo.data.success) {
        navigate(`/details/${uploadVideo.data.video?._id}`);
        toast.success(uploadVideo.data.message);
      } else {
        toast.error(uploadVideo.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Tải video lên thất bại!");
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div className="upload-video">
      <Title title={"Upload video | youtube"} />
      {currentUser ? (
        <form onSubmit={handleSubmitForm}>
          <div className="file-video">
            <div className="file-info flex-1">
              <i className="bx bxs-cloud-upload box-icon"></i>
              <span>Chọn video để tải lên</span>
              <span>Mp4, x-m4v</span>
              <span>Nhỏ hơn 30 MB</span>
              <input
                type="file"
                id="file-upload"
                onChange={handleOnchangeFile}
                accept="video/mp4,video/x-m4v,video/*"
              />
            </div>
            <div className="flex-1">
              {previewVideo && <video src={previewVideo} controls />}
            </div>
          </div>
          <div className="content">
            <div>
              <label>Tiêu đề</label>
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
            <div>
              <label>Thẻ (tags)</label>
              <input
                type="text"
                placeholder="Nhập các từ khóa cách nhau bằng dấu phẩy"
                name="tags"
                onChange={handleChangeInput}
                value={data.tags}
              />
            </div>
            <div>
              <label>Trạng thái</label>
              <select
                className="select"
                name="isPublic"
                onChange={handleChangeInput}
                value={data.isPublic}
              >
                <option value={true}>Công khai</option>
                <option value={false}>Riêng tư</option>
              </select>
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
