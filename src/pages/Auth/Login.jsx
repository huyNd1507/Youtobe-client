import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./Auth.scss";
import LoginForm from "../../components/Auth/LoginForm";
import { useSearchParams } from "../../hooks/useSearchParms";

const Login = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const searchParams = useSearchParams();
  if (currentUser) return <Navigate to={searchParams.get("redirect") || "/"} />;

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
