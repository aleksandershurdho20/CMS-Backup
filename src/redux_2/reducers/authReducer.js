import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_AUTH, REMOVE_AUTH, CHECK_AUTH } from '../constants';

const initState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    //   set axios, localStorage and update state
    case SET_AUTH:
      // return false if token does not exist
      let set_token = action.token;
      if (!set_token) {
        return {
          ...initState,
        };
      }
      localStorage.setItem('token', set_token);
      axios.defaults.headers.common['authorization'] = set_token;

      try {
        let decoded = jwt_decode(set_token);
        if (!tokenIsExpired(decoded)) {
          return {
            ...state,
            user: decoded.id,
            token: set_token,
            isAuthenticated: true,
          };
        }
        return {
          ...initState,
        };
      } catch (err) {
        console.log('SET_AUTH_ERROR', err);
        return {
          ...initState,
        };
      }

    //   remove from localStorage and delete axios header
    case REMOVE_AUTH:
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['authorization'];
      return {
        ...initState,
      };

    //   check if token is valid if it exists in the first place
    case CHECK_AUTH:
      let check_token = localStorage.getItem('token');
      //   returns false
      if (!check_token) {
        return {
          ...initState,
        };
      }
      try {
        let decoded = jwt_decode(check_token);
        if (!tokenIsExpired(decoded)) {
          return {
            ...state,
            user: decoded.id,
            token: check_token,
            isAuthenticated: true,
          };
        }
        return {
          ...initState,
        };
      } catch (err) {
        console.log('CHECK_AUTH_ERROR', err);
        return {
          ...initState,
        };
      }

    //   default
    default:
      return {
        ...initState,
      };
  }
};

export default authReducer;

const tokenIsExpired = (decoded) => {
  if (Date.now() < decoded.exp * 1000) {
    return false;
  }
  console.log('CHECK_AUTH_CHECK_EXPIRATION');
  return true;
};
