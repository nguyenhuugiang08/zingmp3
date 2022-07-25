import axiosClient from "./axiosClient";

const searchTypeApi = {
  getAll: (params) => {
    const url = '/searchtype';
    return axiosClient.get(url, { params });
  },
}

export default searchTypeApi; 