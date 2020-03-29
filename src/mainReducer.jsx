import { combineReducers } from 'redux'


function cardsReducer(state = null, action) {
    let data = action.data
    switch (action.type) {
      case "INIT_STORE":
          console.log('2222222222')
          return {
              cards: data
          };
      case "ADD_PHONE":
          return state.update("phones", (phones) => phones.push(action.phone));
      case "DELETE_PHONE":
          return state.update("phones",
              (phones) => phones.filterNot(
                  (item) => item === action.phone
              )
          );
    }
    return state;
}


function reducer_1(state = null, action) {
    switch (action.type) {
      case "SET_STATE":
          return state.merge(action.state);
      case "ADD_PHONE":
          return state.update("phones", (phones) => phones.push(action.phone));
      case "DELETE_PHONE":
          return state.update("phones",
              (phones) => phones.filterNot(
                  (item) => item === action.phone
              )
          );
    }
    return state;
}

function reducer_2(state = null, action) {
    switch (action.type) {
      case "SET_STATE":
          return state.merge(action.state);
      case "ADD_PHONE":
          return state.update("phones", (phones) => phones.push(action.phone));
      case "DELETE_PHONE":
          return state.update("phones",
              (phones) => phones.filterNot(
                  (item) => item === action.phone
              )
          );
    }
    return state;
}



export default combineReducers({ cardsReducer, reducer_1, reducer_2 })
