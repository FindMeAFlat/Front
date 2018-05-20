import React, { Component } from 'react';
import { connect } from 'react-redux';
    
import CityChooser from './../CityChooser';
import SignIn from './../SignIn';

class IndexSite extends Component {
    render() {
        return this.props.userId
            ? <CityChooser />
            : <SignIn history={this.props.history} />;
    }
}



const mapStateToProps = ({ userId }) => ({userId});
export default connect(mapStateToProps)(IndexSite);