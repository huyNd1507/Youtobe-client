import axiosClient from "./axiosClient";

export const getCommentApi = (videoId) => {
  return axiosClient.get(`/api/comment/${videoId}`);
};

export const deleteCommentApi = (commentId) => {
  return axiosClient.delete(`/api/comment/${commentId}`);
};
export const updateCommentApi = (commentId, updatedData) => {
  return axiosClient.put(`/api/comment/${commentId}`, updatedData);
};

export const postCommentApi = (data) => {
  return axiosClient.post("/api/comment", data);
};
