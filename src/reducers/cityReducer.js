import * as types from './../actions/types';

export default function cityReducer(state = { name: '' }, action) {
  switch (action.type) {
    case types.SELECT_CITY:
      return {
        ...state,
        name: action.city,
      };
    default:
      return state;
  }
}
