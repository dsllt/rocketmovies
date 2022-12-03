import axios from 'axios';

// configura a url base para fazer requisições
export const api = axios.create({
  baseURL: 'http://localhost:3333'
});