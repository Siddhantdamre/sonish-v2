const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
const productionApiUrl = import.meta.env.VITE_API_URL?.trim();

const API_URL = isLocalHost
  ? import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:5001'
  : productionApiUrl || '/api';

export default API_URL;
