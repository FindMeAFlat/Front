import { SIGN_IN, LOG_OUT } from './../actions';

export function userReducer(state = null, action) {
  switch (action.type) {
    case SIGN_IN:
    case LOG_OUT:
      return action.payload;
    default:
      return state;
  }
}
