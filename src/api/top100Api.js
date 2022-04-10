import axiosClient from "./axiosClient";

const top100Api = {
  getAll: (params) => {
    const url = '/top100';
    return axiosClient.get(url, { params });
  },
}

export default top100Api; 