import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Client from "./pages/Client/Client";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { addUser, logOut } from "./redux/slice/authSlice";
import setAuthToken from "./utils/setAuthToken";
import { getUserInfoApi } from "./api/authApi";
import Loading from "./components/Loading/Loading";

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") === "null") {
      dispatch(logOut());
    } else {
      setAuthToken(localStorage.getItem("token"));
      (async () => {
        try {
          const res = await getUserInfoApi();
          if (res.data.success) {
            dispatch(addUser(res.data.user));
          }
        } catch (error) {
          dispatch(logOut());
        }
      })();
    }
  }, [dispatch]);

  if (typeof currentUser === "undefined") return <Loading />;

  return (
    <div className="container">
      <Routes>
        <Route path="/*" element={<Client />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
