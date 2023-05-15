import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RegisterForm from "../../components/Auth/RegisterForm";
import "./Auth.scss";
import { useSearchParams } from "../../hooks/useSearchParms";
import Title from "../../components/Shared/Title";

const Register = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();

  if (currentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div>
      <Title title={"Đăng ký | Youtube"} />
      <RegisterForm />
    </div>
  );
};

export default Register;
