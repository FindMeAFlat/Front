import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.css';

import Header from './../Header';
import Welcome from './../Welcome';
import CityChooser from './../CityChooser';
import SignIn from './../SignIn';
import Search from './../Search';

class Router extends Component {
    propTypes = {
      userId: React.ReactPropTypes.number,
    };

    static renderSignedIn() {
      return (
        <Switch>
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
            <Route path="/" component={Header} />
            <Route exact path="/" component={Welcome} />
            {
                        this.props.userId === null
                            ? Router.renderNotSignedIn()
                            : Router.renderSignedIn()
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
