import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const persistedState = loadState();

let store = createStore(reducers, persistedState, composeWithDevTools())

store.subscribe(throttle(() => {
    saveState({
        isSignIn: store.getState().isSignIn,
        userInfo: store.getState().userInfo,
        isShowModal: false
    })
}, 1000))


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root")
)

