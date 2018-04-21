import React, { Component } from 'react';
import "./index.css"
import {connect} from "react-redux";
import {saveCity} from "./actions";
import c from 'classnames'
class CityChooser extends Component {

    state = {
        cities: ['Wrocław', "Warszawa"],
        city: ""
    };

    submit = () => {
        this.props.saveCity(this.state.city);
        this.props.history.push('/search');
    };

    saveCity = city => {
        return () => {
            this.setState({city: city})
        }
    };

    render() {
        const { city } = this.state;
        return <div className={'dark-background'}>
            <div className={'chooser-wrapper'}>
                {this.state.cities.map(item => <div onClick={this.saveCity(item)} className={c('chooser-element', {'selected': item===city})}>{item}</div>)}
            </div>
            <button
                disabled={this.state.city===""}
                onClick={this.submit}
            >
                Continue
            </button>
        </div>
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        saveCity: (city) => {
            dispatch(saveCity(city))
        }
    }
};

export default connect(null, mapDispatchToProps)(CityChooser)