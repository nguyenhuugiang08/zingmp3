import axiosClient from "./axiosClient";

const weekChartApi = {
  getAll: (params) => {
    const url = '/chart/week';
    return axiosClient.get(url, { params });
  },
}

export default weekChartApi; 