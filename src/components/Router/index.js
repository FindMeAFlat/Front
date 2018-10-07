import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './../Header';
import Welcome from './../Welcome';
import CityChooser from './../CityChooser';
import SignIn from './../SignIn';
import Search from './../Search';
import Criteria from './../Steps/Criteria';
import Map from './../Map';

class Router extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    static renderSignedIn() {
        return (
            <Switch>
                <Route path="/map" component={Map} />
                <Route path="/criteria" component={Criteria} />
                <Route path="/search" component={Search} />
                <Route path="/" component={CityChooser} />
            </Switch>
        );
    }

    static renderNotSignedIn() {
        return (
            <Switch>
                <Route path="/" component={SignIn} />
            </Switch>
        );
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route path="/" component={Header}/>
                    <Route exact path="/" component={Welcome}/>
                    {
                        this.props.userId
                            ? Router.renderSignedIn()
                            : Router.renderNotSignedIn()
                    }
                </div>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => (
    {
        userId: state.userId,
        city: state.city,
    }
);

export default connect(mapStateToProps)(Router);
