import axiosClient from "./axiosClient";

const recommendKeywordApi = {
  getAll: (params) => {
    const url = '/recommendKeyword';
    return axiosClient.get(url, { params });
  },
}

export default recommendKeywordApi; 