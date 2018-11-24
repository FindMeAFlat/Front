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
            selectedCity: {
                name: this.props.city.name,
                englishName: this.props.city.englishName,
            },
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

    createLinkForArm = (city, selected) => `${window.location.origin}/arms/${city.name.toLowerCase()}_${this.state.selectedCity.englishName === city.englishName || selected ? 'c' : 'g'}.png`;

    handleChooseCity = (selectedCity) => {
        this.setState({ selectedCity });
        this.props.selectCity(selectedCity);
        this.props.activateNext();
    };

    render() {
        const { cities } = this.state;

        let arms = null;
        if (cities.length > 0) {
            arms = (
                <div className="cities">
                    {cities.map(city => (
                        <span
                            className="city"
                            onClick={() => this.handleChooseCity(city)}
                            key={city.englishName}
                        >
                            <img
                                id={city}
                                className={`city-arm ${this.state.selectedCity.englishName === city.englishName ? 'selected' : 'not-selected'}`}
                                src={this.createLinkForArm(
                                    city,
                                    this.state.selectedCity.englishName === city.englishName,
                                )}
                                alt={city}
                                onMouseOver={(e) => {
                                    e.target.src = this.createLinkForArm(city, true);
                                }}
                                onMouseOut={(e) => {
                                    e.target.src = this.createLinkForArm(
                                        city,
                                        this.state.selectedCity.englishName === city.englishName,
                                    );
                                }}
                            />
                            <label className="city-name">{city.englishName.toUpperCase()}</label>
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
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        englishName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        localization: PropTypes.object.isRequired,
    }).isRequired,
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
