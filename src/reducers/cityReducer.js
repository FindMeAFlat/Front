import * as types from './../actions/types';

export default function cityReducer(state = { name: '', address: '', localization: {} }, action) {
    switch (action.type) {
    case types.SELECT_CITY:
        return {
            ...state,
            name: action.city,
        };
    case types.SAVE_LOCALIZATION:
        return {
            ...state,
            localization: action.localization,
        };
    case types.SAVE_ADDRESS:
        return {
            ...state,
            address: action.address,
        };
    default:
        return state;
    }
}
