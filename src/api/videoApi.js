import axiosClient from "./axiosClient";

const videoApi = {
  getAll: (params) => {
    const url = '/mv/detail';
    return axiosClient.get(url, { params });
  },
}

export default videoApi; 