import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk';


import reducer from './mainReducer.jsx' 
import App from './components/app/index.jsx'
 
export const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);