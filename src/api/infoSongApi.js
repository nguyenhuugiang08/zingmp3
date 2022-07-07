import axiosClient from "./axiosClient";

const infoSongApi = {
  getAll: (params) => {
    const url = '/infosong';
    return axiosClient.get(url, { params });
  },
}

export default infoSongApi; 