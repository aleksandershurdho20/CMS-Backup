import { SET_AUTH, REMOVE_AUTH, CHECK_AUTH } from '../constants';

export const setAuth = (token) => {
  return { type: SET_AUTH, token: token };
};

export const removeAuth = () => {
  return { type: REMOVE_AUTH };
};

export const checkAuth = () => {
  return { type: CHECK_AUTH };
};
