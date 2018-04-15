import React, { Component } from 'react';

import './index.css';

class Input extends Component {
    state = {
        inputValue: ""
    };
    
    inputHandler = (e) => {
        this.setState({inputValue: e.target.value});
    }

    render() {
        return (
            <input type="text" className="input" onChange={this.inputHandler} value={this.state.inputValue} />
        );
    }
}

export default Input;
