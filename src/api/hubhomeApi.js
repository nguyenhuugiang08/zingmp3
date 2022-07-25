import axiosClient from "./axiosClient";

const hubhomeApi = {
  getAll: (params) => {
    const url = '/hubhome';
    return axiosClient.get(url, { params });
  },
}

export default hubhomeApi; 