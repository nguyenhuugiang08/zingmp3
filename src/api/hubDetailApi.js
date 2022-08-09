import axiosClient from "./axiosClient";

const hubDetailApi = {
  getAll: (params) => {
    const url = '/hub/detail';
    return axiosClient.get(url, { params });
  },
}

export default hubDetailApi; 