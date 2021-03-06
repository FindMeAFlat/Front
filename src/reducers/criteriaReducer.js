import * as types from './../actions/types';

export default function criteriaReducer(state = [], action) {
    switch (action.type) {
        case types.SAVE_CRITERIA:
            return [...action.criteria];
        case types.RESET_ALL:
            return [];
        default:
            return state;
    }
}
