import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import reducers from '../src/reducers/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
  );
ReactDOM.render(<Provider store={store}>
    <HashRouter>
        <ScrollToTop>
            <App></App>
        </ScrollToTop>
    </HashRouter></Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();


export default store;