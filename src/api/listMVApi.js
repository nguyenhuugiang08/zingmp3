import axiosClient from "./axiosClient";

const listMVApi = {
  getAll: (params) => {
    const url = '/mv/list';
    return axiosClient.get(url, { params });
  },
}

export default listMVApi; 