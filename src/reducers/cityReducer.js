import { SAVE_CITY } from "./../actions";

export function cityReducer(state = { city: '' }, action) {
    switch(action.type) {
        case SAVE_CITY:
            return {
                ...state,
                city: action.city
            };
        default:
            return state;
    }
}