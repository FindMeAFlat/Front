import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import StepNavigator from './../StepNavigator';

import { selectCity } from './../../actions';

class CityChooser extends Component {
    static propTypes = {
      selectCity: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
    };

    cities = ['Wrocław', 'Warszawa'];

    state = {
      cities: this.cities,
      selectedCity: this.cities[0],
    };

    handleSubmitCity = () => {
      this.props.selectCity(this.state.selectedCity);
      this.props.history.push('/search');
    };

    handleChooseCity = selectedCity => this.setState({ selectedCity });

    createLinkForArm = (city, selected) => `${window.location.origin}/arms/${city.toLowerCase()}_${this.state.selectedCity === city || selected ? 'c' : 'g'}.png`;

    render() {
      return (
        <div className="city-chooser">
          <StepNavigator stepNumber={1} stepLabel="Select your city" nextPath="search" nextHandler={this.handleSubmitCity}/>

          <div className="cities">
            {this.state.cities.map(city => (
              <span
                className="city"
                onClick={(e) => this.handleChooseCity(city)}
                key={city}
              >
                <img
                  id={city}
                  className={`city-arm ${this.state.selectedCity === city ? 'selected' : 'not-selected'}`}
                  src={this.createLinkForArm(city, false)}
                  alt={city}
                  onMouseOver={(e) => {e.target.src=this.createLinkForArm(city, true)}}
                  onMouseOut={(e) => {e.target.src=this.createLinkForArm(city, false)}}
                />
                <label className="city-name">{city.toUpperCase()}</label>
              </span>))
            }
          </div>
        </div>
      );
    }
}


const mapDispatchToProps = dispatch => ({
  selectCity: city => dispatch(selectCity(city)),
});

export default connect(null, mapDispatchToProps)(CityChooser);
