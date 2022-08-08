// import axiosClient from "./axiosClient";
import axios from 'axios';
import queryString from 'query-string';

const axiosClientSong = axios.create({
  baseURL: process.env.REACT_APP_API_GET_SONG,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer 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',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClientSong.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClientSong.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

const songApi = {
  getAll: (params) => {
    const url = '/song';
    return axiosClientSong.get(url, { params });
  },
}

export default songApi; 