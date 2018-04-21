import {SAVE_CITY} from "./actions";

export function cityReducer(state, action) {
    switch(action.type) {
        case SAVE_CITY:
            return {
                ...state,
                city: action.city
            };
            break;
        default:
            return {
                city: ""
            };
            break;
    }
}