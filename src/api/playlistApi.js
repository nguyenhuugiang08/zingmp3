import axiosClient from "./axiosClient";

const playlistApi = {
  getAll: (params) => {
    const url = '/playlist';
    return axiosClient.get(url, { params });
  },
}

export default playlistApi; 