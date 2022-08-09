import axiosClient from "./axiosClient";

const searchTypeApi = {
  getAll: (params) => {
    const url = '/search/type';
    return axiosClient.get(url, { params });
  },
}

export default searchTypeApi; 