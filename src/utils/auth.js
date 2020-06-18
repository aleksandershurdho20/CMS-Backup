import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const setAuth = (token) => {
  console.log(token);
  localStorage.setItem('token', token);
  axios.defaults.headers.common['authorization'] = token;
};

export const removeAuth = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['authorization'];
  return;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      user: null,
      token: null,
    };
  }
  const decoded = jwt_decode(token);
  if (Date.now() >= decoded.exp * 1000) {
    return {
      user: null,
      token: null,
    };
  }
  return {
    user: decoded,
    token: token,
  };
};
