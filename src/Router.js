import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CityChooser from './components/CityChooser'
import Search from './components/Search'
import {connect} from "react-redux";



class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path={'/search'} component={Search}/>
                    <Route path={'/'} component={CityChooser}/>
                </Switch>
            </BrowserRouter>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        city: state.city
    }
};


export default connect(mapStateToProps)(Router)