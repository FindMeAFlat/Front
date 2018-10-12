import * as types from './types';

export function selectCity(city) {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_CITY,
            city,
        });
    };
}

export function saveLocalisation(localisation) {
    return (dispatch) => {
        dispatch({
            type: types.SAVE_LOCALISATION,
            localisation,
        });
    };
}
