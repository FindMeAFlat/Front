import * as types from './../actions/types';

export default function userReducer(state = '', action) {
  switch (action.type) {
    case types.SIGN_IN:
    case types.LOG_OUT:
      return action.payload;
    default:
      return state;
  }
}
