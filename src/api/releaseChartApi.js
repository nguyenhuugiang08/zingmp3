import axiosClient from "./axiosClient";

const releaseChartApi = {
  getAll: (params) => {
    const url = '/chartrelease';
    return axiosClient.get(url, { params });
  },
}

export default releaseChartApi; 