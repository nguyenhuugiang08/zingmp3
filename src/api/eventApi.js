import axiosClient from "./axiosClient";

const eventApi = {
  getAll: (params) => {
    const url = '/events';
    return axiosClient.get(url, { params });
  },
}

export default eventApi; 