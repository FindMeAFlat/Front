import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

class Input extends Component {
    state = {
        term: ""
    };
    
    inputHandler = (e) => this.setState({ term: e.target.value });

    render() {
        return (
            <input 
                type="text" 
                className="input" 
                onChange={this.inputHandler} 
                value={this.state.term} 
            />
        );
    }
}



const mapStateToProps = (state) => ({
    userId: userId
});

export default connect(mapStateToProps)(Input);