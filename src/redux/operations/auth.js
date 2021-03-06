import axios from 'axios';
import * as actions from '../actions';
import * as types from '../types';
import * as API from '../../services/API';
import INITIAL_STATE from '../initState';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const authLogin = data => {
  return dispatch => {
    dispatch(actions.withOutPayload(types.AUTH_LOGIN_STARTED));
    axios
      .post(API.Login, JSON.stringify(data))
      .then(res => {
        dispatch(actions.withPayload(types.AUTH_LOGIN_SUCCESS, res.data));
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.user.token}`;
      })
      .catch(error =>
        dispatch(
          actions.withPayload(types.AUTH_LOGIN_FAILURE, {
            status: error.message,
          }),
        ),
      );
  };
};

export const authRegister = data => {
  return dispatch => {
    dispatch(actions.withOutPayload(types.AUTH_REGISTER_STARTED));
    axios
      .post(API.Register, JSON.stringify(data))
      .then(res => {
        dispatch(actions.withPayload(types.AUTH_REGISTER_SUCCESS, res.data));
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.user.token}`;
      })
      .catch(error =>
        dispatch(
          actions.withPayload(types.AUTH_REGISTER_FAILURE, {
            status: error.message,
          }),
        ),
      );
  };
};

export const authLogout = data => {
  return dispatch => {
    dispatch(actions.withOutPayload(types.AUTH_LOGOUT_STARTED));
    axios
      .post(API.Logout)
      .then(res => {
        dispatch(
          actions.withPayload(types.AUTH_LOGOUT_SUCCESS, {
            ...INITIAL_STATE.public,
          }),
        );
        axios.defaults.headers.common.Authorization = '';
        dispatch(actions.withPayload(types.INIT_KAPUSTA_LOGOUT, false));
      })
      .catch(error =>
        dispatch(
          actions.withPayload(types.AUTH_LOGOUT_FAILURE, {
            status: error.message,
          }),
        ),
      );
  };
};
