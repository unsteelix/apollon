import { combineReducers } from 'redux'
import { INIT_STORE, SET_QUERY, RESET_QUERY, SET_USER, RESET_USER } from './utils/actionTypes'


function cardsReducer(state = {}, action) {
    let data = action.data
    switch (action.type) {
        case INIT_STORE:
            console.log('Reducer INIT_STORE ', data)
            return data
        break
    }
    return state;
}


function queryReducer(state = '', action) {
    let data = action.data
    switch (action.type) {
        case SET_QUERY:
            console.log('Reducer SET_QUERY ' + data)
            return data
        break

        case RESET_QUERY:
            console.log('Reducer RESET_QUERY ' + data)
            return ''
        break
    }
    return state;
}


function userReducer(state = null, action) {
    let data = action.data
    switch (action.type) {
        case SET_USER:
            console.log('Reducer SET_USER ' + data)
            return data
        break

        case RESET_USER:
            console.log('Reducer RESET_USER ' + data)
            return null
        break
    }
    return state;
}



export default combineReducers({ 
    cards: cardsReducer, 
    query: queryReducer, 
    user: userReducer 
})