import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getUserInfoApi, loginUserApi } from "../../api/authApi";
import { addUser } from "../../redux/slice/authSlice";
import setAuthToken from "../../utils/setAuthToken";
import Loading from "../Loading/Loading";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      setLoading(true);

      try {
        const res = await loginUserApi(value);
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setAuthToken(res.data.token);
          const userInfo = await getUserInfoApi();
          dispatch(addUser(userInfo.data.user));
          toast.success(res.data.message);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }

      setLoading(false);
    },
    validationSchema: Yup.object({
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
    }),
  });

  return (
    <>
      <section className="form-container">
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1>Đăng nhập</h1>
          <div className="form-group">
            <label>Email</label>
            <input
              placeholder="EX: huytranquang@gmail.com"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {formik.errors.email && (
              <p className="text-err">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="EX: 123456"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            {formik.errors.password && (
              <p className="text-err">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn">
            Đăng nhập
          </button>
          <p className="text-form">
            Nếu bạn chưa có tài khoản
            <Link className="text-blue" to="/register">
              Đăng ký
            </Link>
          </p>
          <div className="back-home">
            <button>
              <Link to="/">Quay lại trang chủ!</Link>
            </button>
          </div>
        </form>
      </section>
      <div>
        <i class="bx bxs-hide"></i>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default LoginForm;
