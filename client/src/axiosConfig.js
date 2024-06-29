import axios from 'axios';
const baseURL1 = 'http://localhost:3001';
const baseURL2 = 'https://bbms-server.vercel.app';

// Set a condition to choose which base URL to use
const baseURL = process.env.NODE_ENV === 'production' ? baseURL2 : baseURL1;

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

export default instance;
