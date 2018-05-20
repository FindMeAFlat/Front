import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";

import Header from  './../Header';
import IndexSite from './../IndexSite';

class Router extends Component {
    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route path={'/'} component={Header}/>
                    <Switch>
                        <Route path={'/'} component={IndexSite}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}



const mapStateToProps = (state) => (
    {
        city: state.city
    }
);

export default connect(mapStateToProps)(Router);