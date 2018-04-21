import React, { Component } from 'react'
import {createStore, applyMiddleware} from 'redux'
import {cityReducer} from "./components/CityChooser/reducers";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import Router from "./Router";

const store = createStore(cityReducer, composeWithDevTools(applyMiddleware(thunk)));
export default class App extends Component {



    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        )
    }
}