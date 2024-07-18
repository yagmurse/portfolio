import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

customFetch.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customFetch;
