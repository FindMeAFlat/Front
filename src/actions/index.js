export const SAVE_CITY = 'SAVE_CITY';
export function saveCity(city) {
    return dispatch => {
        dispatch({
            type: SAVE_CITY,
            city
        });
    }
}

export const SIGN_IN = 'SIGN_IN';
export function signIn(userId) {
    return dispatch => {
        dispatch({
            type: SIGN_IN,
            payload: userId
        });
    }
}

export const LOG_OUT = 'LOG_OUT';
export function logOut() {
    return dispatch => {
        dispatch({
            type: LOG_OUT,
            payload: null
        });
    }
}