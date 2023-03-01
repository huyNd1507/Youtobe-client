import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RegisterForm from "../../components/Auth/RegisterForm";
import "./Auth.scss";
import { useSearchParams } from "../../hooks/useSearchParms";

const Register = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();

  if (currentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
