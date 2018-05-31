import { SELECT_CITY } from './../actions';

export default function cityReducer(state = { city: '' }, action) {
  switch (action.type) {
    case SELECT_CITY:
      return {
        ...state,
        city: action.city,
      };
    default:
      return state;
  }
}
