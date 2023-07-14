import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Overlay from "./Overlay";
import { updatedUser } from "../../redux/slice/channelSlice";
import { uploadImg } from "../../utils/uploadImg";
import Loading from "../Loading/Loading";

const ModalUpdateUser = ({ setShow }) => {
  const { profile } = useSelector((state) => state.channel);
  const [previewAvatar, setPreviewAvatar] = useState(profile?.avatar);

  const [data, setData] = useState({
    name: profile.name,
    description: profile.description,
  });
  const [avatar, setAvatar] = useState();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file.size / 1000000 > 5)
      return toast.error("File ảnh ko được vượt quá 5 MB!");
    const preview = URL.createObjectURL(file);
    setPreviewAvatar(preview);
    setAvatar(file);
  };

  useEffect(() => {
    return () => {
      previewAvatar && URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);

  const handleUpdated = async (e) => {
    e.preventDefault();
    if (
      previewAvatar === profile.avatar &&
      data.name === profile.name &&
      data.description === profile.description
    )
      return setShow(false);

    if (!data.name.trim() || !data.description.trim()) {
      return toast.error("Không được để chống name và email!");
    }

    if (data.name.trim().length > 20 || data.name.trim().length < 6) {
      return toast.warn("Tên không đc ít hơn 4 kí tự và vượt quá 20 kí tự!");
    }

    if (data.description.trim().length > 75) {
      return toast.warn("Mô tả kênh của bạn không đc vượt quá 75 kí tự!");
    }

    setLoading(true);

    if (!avatar) {
      dispatch(updatedUser(data));
    }

    if (avatar) {
      const url = await uploadImg(avatar);
      dispatch(
        updatedUser({
          ...data,
          avatar: url,
        })
      );
    }

    if (avatar) {
      const files = [avatar];
      const url = await Promise.all(files.map(async (p) => await uploadImg(p)));
      dispatch(
        updatedUser({
          ...data,
          avatar: url[1],
        })
      );
    }

    setShow(false);
    setLoading(false);
    return toast.success("Tùy chỉnh kênh thành công");
  };
  return (
    <>
      <Overlay setShow={setShow}>
        <div className="modal-box">
          <form onSubmit={handleUpdated} onClick={(e) => e.stopPropagation()}>
            <div>
              <img alt="" src={previewAvatar} />
              <input
                type="file"
                id="file-avatar"
                accept="image/*"
                onChange={handleChangeAvatar}
              />
            </div>
            <div className="content">
              <div>
                <label>Tiêu để</label>
                <input
                  type="text"
                  placeholder="Tiêu đề..."
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
              <div>
                <label>Mô tả</label>
                <textarea
                  type="text"
                  placeholder="Mô tả..."
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                  rows="4"
                />
              </div>
              <button>Update</button>
            </div>
          </form>
        </div>
      </Overlay>
      {loading && <Loading />}
    </>
  );
};

export default ModalUpdateUser;
