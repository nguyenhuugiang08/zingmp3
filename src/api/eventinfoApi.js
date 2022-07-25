import axiosClient from "./axiosClient";

const eventinfoApi = {
  getAll: (params) => {
    const url = '/eventinfo';
    return axiosClient.get(url, { params });
  },
}

export default eventinfoApi; 