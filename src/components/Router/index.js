import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './../Header';
import Steps from './../Steps';

class Router extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Steps />
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
