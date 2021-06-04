import axios from 'axios';

const api = axios.create({
  baseURL: 'https://suppli-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
