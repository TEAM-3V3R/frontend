import axios from 'axios';

const userNo = localStorage.getItem('userNo') || '';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'user-no': userNo,
  },
});
instance.interceptors.request
  .use
  // (config) => {
  //     const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴
  //     if (token) {
  //         config.headers['Authorization'] = `Bearer ${token}`;
  //     }
  //     return config;
  // },
  // (error) => {
  //   return Promise.reject(error);
  // }
  ();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
