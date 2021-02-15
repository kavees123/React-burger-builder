import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'; 

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerbuilderreducer from './store/reducer/burgerbuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducer/order';
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    burgerBuilder: burgerbuilderreducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnchancer(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

