import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => {
    const url = 'mv/category';
    return axiosClient.get(url, { params });
  },
}

export default categoryApi; 