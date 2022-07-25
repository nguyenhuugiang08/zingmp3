import axiosClient from "./axiosClient";

const hubDetailApi = {
  getAll: (params) => {
    const url = '/hubdetail';
    return axiosClient.get(url, { params });
  },
}

export default hubDetailApi; 