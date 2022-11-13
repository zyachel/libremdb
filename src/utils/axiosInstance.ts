import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.imdb.com/',
  timeout: 50000,
  headers: {
    ...(process.env.AXIOS_USERAGENT && {
      'User-Agent': process.env.AXIOS_USERAGENT,
    }),
    ...(process.env.AXIOS_ACCEPT && { Accept: process.env.AXIOS_ACCEPT }),
    ...(process.env.AXIOS_LANGUAGE && {
      'Accept-Language': process.env.AXIOS_LANGUAGE,
    }),
  },
});

export default axiosInstance;
