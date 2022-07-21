import axiosClient from "./axiosClient";

const suggestPlaylistApi = {
  getAll: (params) => {
    const url = '/suggestedplaylist';
    return axiosClient.get(url, { params });
  },
}

export default suggestPlaylistApi; 