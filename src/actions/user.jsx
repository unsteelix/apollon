import { SET_USER, RESET_USER } from '../utils/actionTypes'


export const setUser = (user) => dispatch => {
    dispatch({
        type: SET_USER,
        data: user    
    })
}

export const resetUser = () => dispatch => {
    dispatch({
        type: RESET_USER
    })
}