import axiosClient from "./axiosClient";

const weekChartApi = {
  getAll: (params) => {
    const url = '/weekchart';
    return axiosClient.get(url, { params });
  },
}

export default weekChartApi; 