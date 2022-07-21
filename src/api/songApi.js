import axiosClient from "./axiosClient";

const songApi = {
  getAll: (params) => {
    const url = '/songs';
    return axiosClient.get(url, { params });
  },
}

export default songApi; 