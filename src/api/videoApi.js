import axiosClient from "./axiosClient";

const videoApi = {
  getAll: (params) => {
    const url = '/video';
    return axiosClient.get(url, { params });
  },
}

export default videoApi; 