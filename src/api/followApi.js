import axiosClient from "./axiosClient";

const followApi = {
  getAll: (params) => {
    const url = '/follow';
    return axiosClient.get(url, { params });
  },
}

export default followApi; 