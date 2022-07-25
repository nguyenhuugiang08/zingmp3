import axiosClient from "./axiosClient";

const suggestionKeywordApi = {
  getAll: (params) => {
    const url = '/suggestionKeyword';
    return axiosClient.get(url, { params });
  },
}

export default suggestionKeywordApi; 