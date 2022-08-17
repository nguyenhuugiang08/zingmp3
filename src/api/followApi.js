import axiosClient from "./axiosClient";

const followApi = {
  getAll: (params) => {
    const url = '/newfeeds';
    return axiosClient.get(url, { params });
  },
}

export default followApi; 