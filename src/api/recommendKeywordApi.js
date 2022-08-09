import axiosClient from "./axiosClient";

const recommendKeywordApi = {
  getAll: (params) => {
    const url = '/recommend-keyword';
    return axiosClient.get(url, { params });
  },
}

export default recommendKeywordApi; 