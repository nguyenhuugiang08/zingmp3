import axiosClient from "./axiosClient";

const videoApi = {
  getAll: (params) => {
    const url = '/mv';
    return axiosClient.get(url, { params });
  },
}

export default videoApi; 