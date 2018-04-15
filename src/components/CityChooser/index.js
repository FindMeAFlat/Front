import React, { Component } from 'react';
import "./index.css"

export default class CityChooser extends Component {

    state = {
        cities: ['Krakow', "Franczak", "Pizda"]
    }

    redirect = () => {
        this.props.history.push('/search')
    }

    render() {
        return <div className={'dark-background'}>
            <div className={'chooser-wrapper'}>
                {this.state.cities.map(city => <div onClick={this.redirect} className={'chooser-element'}>{city}</div>)}
            </div>
        </div>
    }
}