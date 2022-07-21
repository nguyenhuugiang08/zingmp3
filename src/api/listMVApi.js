import axiosClient from "./axiosClient";

const listMVApi = {
  getAll: (params) => {
    const url = '/listMv';
    return axiosClient.get(url, { params });
  },
}

export default listMVApi; 