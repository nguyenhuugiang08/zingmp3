import axiosClient from "./axiosClient";

const hubhomeApi = {
  getAll: (params) => {
    const url = '/hub/home';
    return axiosClient.get(url, { params });
  },
}

export default hubhomeApi; 