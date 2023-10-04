import React from "react";
import { TwinSpin } from "react-cssfx-loading";

const Loading = () => {
  return (
    <div className="loading">
      <TwinSpin color="red" width="100px" height="100px" />
    </div>
  );
};

export default Loading;
