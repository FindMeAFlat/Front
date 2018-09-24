import * as types from './types';

export function signIn(userId) {
  return (dispatch) => {
    dispatch({
      type: types.SIGN_IN,
      payload: userId,
    });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch({
      type: types.LOG_OUT,
      payload: null,
    });
  };
}
