import * as types from './types';

export default function saveCriteria(criteria) {
    return (dispatch) => {
        dispatch({
            type: types.SAVE_CRITERIA,
            criteria,
        });
    };
}
