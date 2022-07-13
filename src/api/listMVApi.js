import axiosClient from "./axiosClient";

const listMVApi = {
  getAll: (params) => {
    const url = '/listmv';
    return axiosClient.get(url, { params });
  },
}

export default listMVApi; 