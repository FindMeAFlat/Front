import * as types from './types';

export function selectCity(city) {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_CITY,
            city,
        });
    };
}

export function saveLocalization(localization) {
    return (dispatch) => {
        dispatch({
            type: types.SAVE_LOCALIZATION,
            localization,
        });
    };
}
