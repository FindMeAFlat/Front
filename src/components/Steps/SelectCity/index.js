import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectCity } from './../../../actions/cities';
import Errors from '../../../const/errors';

class SelectCity extends Component {
    static validate = ({ city }) => (!city || !city.name ? Errors.selectCity : null);

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/cities`)
            .then(({ data: { data } }) => {
                this.setState({
                    cities: data,
                });
            });
    }

    createLinkForArm = (city, selected) => `${window.location.origin}/arms/${city.toLowerCase()}_${this.props.city === city || selected ? 'c' : 'g'}.png`;

    handleChooseCity = (selectedCity) => {
        this.props.selectCity(selectedCity);
        this.props.activateNext();
    };

    render() {
        const { cities } = this.state;
        const chosenCityName = this.props.city.name;

        let arms = null;
        if (cities.length > 0) {
            arms = (
                <div className="cities">
                    {cities.map(city => (
                        <span
                            className="city"
                            onClick={() => this.handleChooseCity(city)}
                            key={city}
                        >
                            <img
                                id={city}
                                className={`city-arm ${chosenCityName === city ? 'selected' : 'not-selected'}`}
                                src={this.createLinkForArm(city, chosenCityName === city)}
                                alt={city}
                                onMouseOver={(e) => {
                                    e.target.src =
                                    this.createLinkForArm(city, true);
                                }}
                                onMouseOut={(e) => {
                                    e.target.src =
                                        this.createLinkForArm(city, chosenCityName === city);
                                }}
                            />
                            <label className="city-name">{city.toUpperCase()}</label>
                        </span>))
                    }
                </div>
            );
        }
        return (
            <div className="city-chooser">
                {arms}
            </div>
        );
    }
}

SelectCity.propTypes = {
    city: PropTypes.string.isRequired,
    selectCity: PropTypes.func.isRequired,
    activateNext: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    selectCity: city => dispatch(selectCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCity);
