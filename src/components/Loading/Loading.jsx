import React from "react";
import { CircularProgress } from "react-cssfx-loading";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress color="red" width="100px" height="100px" />
    </div>
  );
};

export default Loading;
