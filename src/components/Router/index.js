import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './../Header';
import Steps from './../Steps';
import SignIn from './../SignIn';

class Router extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    static renderSignedIn = () => <Steps />;

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
                    <Route path="/" component={Header} />
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
