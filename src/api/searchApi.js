import axiosClient from "./axiosClient";

const searchApi = {
  getAll: (params) => {
    const url = '/search';
    return axiosClient.get(url, { params });
  },
}

export default searchApi; 