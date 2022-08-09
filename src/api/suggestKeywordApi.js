import axiosClient from "./axiosClient";

const suggestionKeywordApi = {
  getAll: (params) => {
    const url = '/suggestion-keyword';
    return axiosClient.get(url, { params });
  },
}

export default suggestionKeywordApi; 