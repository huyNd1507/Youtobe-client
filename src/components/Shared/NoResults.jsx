import React from "react";

const NoResults = () => {
  return (
    <div className="flex-center ">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/2212/2212806.png"
          alt=""
          style={{ width: "100px", height: "100px" }}
        />
        <h1>Không có video nào</h1>
      </div>
    </div>
  );
};

export default NoResults;
