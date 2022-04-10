import axiosClient from "./axiosClient";

const lyricApi = {
  getAll: (params) => {
    const url = '/lyric';
    return axiosClient.get(url, { params });
  },
}

export default lyricApi; 