import axiosClient from "./axiosClient";

const infoSongApi = {
  getAll: (params) => {
    const url = '/info';
    return axiosClient.get(url, { params });
  },
}

export default infoSongApi; 