import React, { useState } from "react";

import Video from "../../components/Video/Video";
import { getVideoHomePage } from "../../redux/slice/infinityLoadSlice";
import Title from "../../components/Shared/Title";

const Home = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <Title title={"Trang chủ | Youtube"} />
      <Video page={page} setPage={setPage} GetData={getVideoHomePage} />
    </>
  );
};

export default Home;
