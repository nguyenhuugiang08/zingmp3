import axiosClient from "./axiosClient";

const suggestPlaylistApi = {
  getAll: (params) => {
    const url = '/playlist/section-bottom';
    return axiosClient.get(url, { params });
  },
}

export default suggestPlaylistApi; 