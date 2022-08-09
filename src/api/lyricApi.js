import axiosClient from "./axiosClient";

const lyricApi = {
  getAll: (params) => {
    const url = '/song/lyrics';
    return axiosClient.get(url, { params });
  },
}

export default lyricApi; 