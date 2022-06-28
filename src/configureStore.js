/* @flow */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducers from './App/UI/rootReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [process.env.NODE_ENV === 'development' ? createLogger() : undefined].filter(
    middleware => !!middleware,
);

export default () => {
    const store = createStore(
        combineReducers({ ...rootReducers }),
        undefined,
        composeEnhancers(applyMiddleware(...middlewares)),
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        // $FlowFixMe
        module.hot.accept('./App/UI/rootReducers', () => {
            const nextRootReducer = require('./App/UI/rootReducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};
