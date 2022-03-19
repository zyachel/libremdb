const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://www.imdb.com/',
  timeout: 500000,
});

module.exports = axiosInstance;
