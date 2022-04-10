import axiosClient from "./axiosClient";

const songApi = {
  getAll: (params) => {
    const url = '/song';
    return axiosClient.get(url, { params });
  },
}

export default songApi; 