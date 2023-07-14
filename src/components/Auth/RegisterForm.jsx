import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getUserInfoApi, registerUserApi } from "../../api/authApi";
import { addUser } from "../../redux/slice/authSlice";
import setAuthToken from "../../utils/setAuthToken";
import Loading from "../Loading/Loading";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const [showpassword, setShowpassword] = useState(false);
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      comfirmPassword: "",
    },
    onSubmit: async (value) => {
      setLoading(true);
      try {
        const res = await registerUserApi(value);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setAuthToken(res.data.token);
          const userInfo = await getUserInfoApi();
          dispatch(addUser(userInfo.data.user));
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Trường này là bắt buộc!")
        .min(6, "Tên phải có ít nhất 6 kí tự!")
        .max(20, "Tên không đc vượt quá 20 kí tự!"),
      email: Yup.string()
        .required("Trường này là bắt buộc!")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng!"
        ),
      password: Yup.string()
        .max(10, "Mật khẩu không đc vượt quá 10 kí tự!")
        .required("Trường này là bắt buộc!")
        .min(6, "Mật khẩu có ít nhất 6 kí tự!"),
      comfirmPassword: Yup.string()
        .required("Trường này là bắt buộc!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!"),
    }),
  });

  return (
    <>
      {loading && <Loading />}
      <section className="form-container">
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1>Đăng ký</h1>
          <div className="form-group">
            <label>Fullname</label>
            <input
              placeholder="EX: Tran Quang Huy"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
<<<<<<< HEAD
            {formik.errors.name && (
              <p className="text-err">{formik.errors.name}</p>
            )}
          </div>
=======
          </div>
          {formik.errors.name && (
            <p className="text-err">{formik.errors.name}</p>
          )}
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="EX: huytranquang@gmail.com"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
<<<<<<< HEAD
            {formik.errors.email && (
              <p className="text-err">{formik.errors.email}</p>
            )}
          </div>
=======
          </div>
          {formik.errors.email && (
            <p className="text-err">{formik.errors.email}</p>
          )}
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3
          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="EX: 123456 "
<<<<<<< HEAD
              type="password"
=======
              type={showpassword ? "text" : "password"}
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
<<<<<<< HEAD
            {formik.errors.password && (
              <p className="text-err">{formik.errors.password}</p>
            )}
          </div>
=======
            <div
              className="toggle-password"
              onClick={() => setShowpassword(!showpassword)}
            >
              <i
                className={`bx ${
                  showpassword ? "bx-show" : " bxs-hide"
                } box-icon `}
              ></i>
            </div>
          </div>
          {formik.errors.password && (
            <p className="text-err">{formik.errors.password}</p>
          )}
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              placeholder="EX: 123456"
              type="password"
              name="comfirmPassword"
              value={formik.values.comfirmPassword}
              onChange={formik.handleChange}
            />
<<<<<<< HEAD
            {formik.errors.comfirmPassword && (
              <p className="text-err">{formik.errors.comfirmPassword}</p>
            )}
          </div>
=======
          </div>
          {formik.errors.comfirmPassword && (
            <p className="text-err">{formik.errors.comfirmPassword}</p>
          )}
>>>>>>> b64be17e8a3ef556d78b1b3ce4e33526fdc121e3

          <button type="submit" className="btn">
            Đăng ký
          </button>
          <p className="text-form">
            Nếu bạn có tài khoản
            <Link className="text-blue" to="/login">
              Đăng nhập
            </Link>
          </p>
          <div className="back-home">
            <button>
              <Link to="/">Quay lại trang chủ!</Link>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegisterForm;
