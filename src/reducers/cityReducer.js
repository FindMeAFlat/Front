import * as types from './../actions/types';

export default function cityReducer(state = {
    englishName: '', name: '', address: '', localization: {},
}, action) {
    switch (action.type) {
        case types.SELECT_CITY:
            return {
                ...state,
                ...action.city,
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
        case types.RESET_ALL:
            return {
                englishName: '', name: '', address: '', localization: {},
            };
        default:
            return state;
    }
}
