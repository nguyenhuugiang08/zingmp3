import axiosClient from "./axiosClient";

const releaseChartApi = {
  getAll: (params) => {
    const url = '/chart/new-release';
    return axiosClient.get(url, { params });
  },
}

export default releaseChartApi; 