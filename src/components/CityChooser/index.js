import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import StepNavigator from './../StepNavigator';
import { selectCity } from './../../actions/cities';

class CityChooser extends Component {
  static propTypes = {
      selectCity: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = {
          cities: [],
          selectedCity: ''
      };
  }

  componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_URL}/api/cities`)
          .then((response) => {
            response = response.data.data;
              this.setState({
                cities: response,
                selectedCity: response[0]
              })
          })
          .catch((error) => {
              console.error(error);
          });
  };

  handleSubmitCity = () => {
      this.props.selectCity(this.state.selectedCity);
      this.props.history.push('/search');
  };

  handleChooseCity = selectedCity => this.setState({ selectedCity });

  createLinkForArm = (city, selected) =>
  `${window.location.origin}/arms/${city.toLowerCase()}_${this.state.selectedCity === city || selected ? 'c' : 'g'}.png`;

  render() {
    const { cities, selectedCity } = this.state;
      let arms = null;
      if (cities.length > 0) {
        arms = <div className="cities">
            {cities.map(city => (
                <span
                    className="city"
                    onClick={() => this.handleChooseCity(city)}
                    key={city}
                >
                    <img
                        id={city}
                        className={`city-arm ${this.state.selectedCity === city ? 'selected' : 'not-selected'}`}
                        src={this.createLinkForArm(city, false)}
                        alt={city}
                        onMouseOver={(e) => {
                            e.target.src = this.createLinkForArm(city, true);
                        }}
                        onMouseOut={(e) => {
                            e.target.src = this.createLinkForArm(city, false);
                        }}
                    />
                    <label className="city-name">{city.toUpperCase()}</label>
                </span>))
            }
        </div>
      }
      return (
          <div className="city-chooser">
              <StepNavigator
                  stepNumber={1}
                  stepLabel="Select your city"
                  nextPath="search"
                  nextHandler={this.handleSubmitCity}
              />
            {arms}
          </div>
      );
  }
}

const mapDispatchToProps = dispatch => ({
    selectCity: city => dispatch(selectCity(city)),
});

export default connect(null, mapDispatchToProps)(CityChooser);
