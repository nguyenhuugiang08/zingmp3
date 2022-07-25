import axiosClient from "./axiosClient";

const radioApi = {
  getAll: (params) => {
    const url = '/radio';
    return axiosClient.get(url, { params });
  },
}

export default radioApi; 