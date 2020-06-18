import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import configureStore from './redux/reducers/configureStore'
// const store = configureStore();
import auth from './redux_2/reducers/authReducer';
const rootReducer = combineReducers({ auth });
const store = createStore(rootReducer, composeWithDevTools());
store.dispatch({ type: 'CHECK_AUTH' });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
