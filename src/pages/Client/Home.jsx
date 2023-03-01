import React, { useState } from "react";

import Video from "../../components/Video/Video";
import { getVideoHomePage } from "../../redux/slice/infinityLoadSlice";

const Home = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <Video page={page} setPage={setPage} GetData={getVideoHomePage} />
    </>
  );
};

export default Home;
