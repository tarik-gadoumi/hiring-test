import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/UI';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
