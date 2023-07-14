export const addVideoLocal = (video) => {
  const history_video =
    JSON.parse(localStorage.getItem("you-tube-history")) || [];

  const checkVideoExist = history_video.some((p) => p._id === video._id);

  if (!checkVideoExist) {
    history_video.push(video);
    localStorage.setItem("you-tube-history", JSON.stringify(history_video));
  }
};

export const getVideoLocal = () => {
  const history_video =
    JSON.parse(localStorage.getItem("you-tube-history")) || [];

  const results = history_video.sort((a, b) => b.viewAt - a.viewAt);

  return results;
};
