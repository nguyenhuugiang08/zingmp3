import axiosClient from "./axiosClient";

const listMVApi = {
  getAll: (params) => {
    const url = '/listMV';
    return axiosClient.get(url, { params });
  },
}

export default listMVApi; 