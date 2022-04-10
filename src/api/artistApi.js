import axiosClient from "./axiosClient";

const artistApi = {
  getAll: (params) => {
    const url = '/artist';
    return axiosClient.get(url, { params });
  },
}

export default artistApi; 