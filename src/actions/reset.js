import * as types from './types';

export default function resetAll() {
    return (dispatch) => {
        dispatch({
            type: types.RESET_ALL,
        });
    };
}
