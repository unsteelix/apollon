import { SET_QUERY, RESET_QUERY } from '../utils/actionTypes'


export const setQuery = (query) => dispatch => {
    dispatch({
        type: SET_QUERY,
        data: query
    })
}

export const resetQuery = () => dispatch => {
    dispatch({
        type: RESET_QUERY
    })
}