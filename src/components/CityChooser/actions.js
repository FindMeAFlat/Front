export const SAVE_CITY = 'SAVE_CITY';
export function saveCity(city) {
    return dispatch => {
        dispatch({
            type: SAVE_CITY,
            city
        })
    }
}