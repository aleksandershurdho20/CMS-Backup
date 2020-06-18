// import {createStore, applyMiddleware, compose} from 'redux';
// // import rootReducer from './reducers'
// // import rootReducer from './reducers'
// import rootReducer from '../reducers'

// import {apiMiddleware} from './middlewares';
// export default function configureStore(initialState){
//     const composeEnhancers = window.__REDUX__DEVTOOLS_EXTENSION_COMPOSE || compose;
//     return createStore(rootReducer,initialState,applyMiddleware(apiMiddleware));
// };
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers'
import {apiMiddleware} from './middlewares';


export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(apiMiddleware)));
};