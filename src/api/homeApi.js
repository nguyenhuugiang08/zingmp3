import axiosClient from "./axiosClient";

const homeApi = {
  getAll: (params) => {
    const url = '/home';
    return axiosClient.get(url, { params });
  },
}

export default homeApi; 