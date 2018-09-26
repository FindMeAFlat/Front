import * as types from './types';

export function selectCity(city) {
  return (dispatch) => {
    dispatch({
      type: types.SELECT_CITY,
      city,
    });
  };
}
