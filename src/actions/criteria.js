import * as types from './types';

export function saveCriteria(criteria) {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_CRITERIA,
      criteria,
    });
  };
}
