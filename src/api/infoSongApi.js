import axiosClient from "./axiosClient";

const infoSongApi = {
  getAll: (params) => {
    const url = '/song/info';
    return axiosClient.get(url, { params });
  },
}

export default infoSongApi; 