import React from "react";
import Noresult from "../../image/Noresult.png";

const NoResults = () => {
  return (
    <div className="flex-center no-result">
      <img src={Noresult} alt="" style={{ width: "300px", height: "300px" }} />
    </div>
  );
};

export default NoResults;
