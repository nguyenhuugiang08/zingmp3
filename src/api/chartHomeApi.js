import axiosClient from "./axiosClient";

const chartHomeApi = {
  getAll: (params) => {
    const url = '/charthome';
    return axiosClient.get(url, { params });
  },
}

export default chartHomeApi; 