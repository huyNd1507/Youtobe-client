import React, { useState } from "react";
import { useSelector } from "react-redux";

import WantLogin from "../../components/Shared/WantLogin";
import Video from "../../components/Video/Video";
import { getVideoSubsrciption } from "../../redux/slice/infinityLoadSlice";

const Subsrciption = () => {
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state) => state.auth);

  if (!currentUser) return <WantLogin />;

  return (
    <div>
      <Video page={page} setPage={setPage} GetData={getVideoSubsrciption} />
    </div>
  );
};

export default Subsrciption;
