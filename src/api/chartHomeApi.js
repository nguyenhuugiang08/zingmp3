import axiosClient from "./axiosClient";

const chartHomeApi = {
  getAll: (params) => {
    const url = '/chart-home';
    return axiosClient.get(url, { params });
  },
}

export default chartHomeApi; 