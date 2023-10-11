import axiosClient from "./axiosClient";

export const createNotificationApi = (data) => {
  return axiosClient.post("/api/notification", data);
};

export const markNotificationAsReadApi = (notificationId) => {
  return axiosClient.put(`/api/notification/${notificationId}/mark-as-read`);
};

export const updateUserApi = (userId, data) => {
  return axiosClient.put(`/api/user/${userId}`, data);
};
