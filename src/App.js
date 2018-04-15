import React, { Component } from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import CityChooser from './components/CityChooser'
import Search from './components/Search'

export default class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <div style={{width: '100%', height: '100%'}}>
                    <Route path={'/search'} component={Search}/>
                    <Route path={'/chooser'} component={CityChooser}/>
                </div>
            </BrowserRouter>
        )
    }
}