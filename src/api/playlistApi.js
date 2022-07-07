import axiosClient from "./axiosClient";

const playlistApi = {
  getAll: (params) => {
    const url = '/detailplaylist';
    return axiosClient.get(url, { params });
  },
}

export default playlistApi; 