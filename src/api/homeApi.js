import axiosClient from "./axiosClient";

const homeApi = {
  getAll: (params) => {
    const url = '/';
    return axiosClient.get(url, { params });
  },
}

export default homeApi; 
