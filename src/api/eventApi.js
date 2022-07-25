import axiosClient from "./axiosClient";

const eventApi = {
  getAll: (params) => {
    const url = '/event';
    return axiosClient.get(url, { params });
  },
}

export default eventApi; 