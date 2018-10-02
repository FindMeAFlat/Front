import * as types from './../actions/types';

export default function criteriaReducer(state = [], action) {
  switch (action.type) {
    case types.SAVE_CRITERIA:
      return {
        ...state,
        criteria: action.criteria,
      };
    default:
      return state;
  }
}
