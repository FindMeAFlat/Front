export const SELECT_CITY = 'SELECT_CITY';
export function selectCity(city) {
  return (dispatch) => {
    dispatch({
      type: SELECT_CITY,
      city,
    });
  };
}

export const SIGN_IN = 'SIGN_IN';
export function signIn(userId) {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN,
      payload: userId,
    });
  };
}

export const LOG_OUT = 'LOG_OUT';
export function logOut() {
  return (dispatch) => {
    dispatch({
      type: LOG_OUT,
      payload: null,
    });
  };
}
