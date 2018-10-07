import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectCity } from './../../../actions/cities';

const CITIES = ['Wrocław', 'Warszawa'];

class SelectCity extends Component {
    static propTypes = {
        city: PropTypes.string.isRequired,
        selectCity: PropTypes.func.isRequired,
        scrollToNext: PropTypes.func.isRequired,
    };

    handleChooseCity = (selectedCity) => {
        this.props.selectCity(selectedCity);
        this.props.scrollToNext();
    }

    createLinkForArm = (city, selected) => `${window.location.origin}/arms/${city.toLowerCase()}_${this.props.city === city || selected ? 'c' : 'g'}.png`;

    render() {
        return (
            <div className="city-chooser">

                <div className="cities">
                    {CITIES.map(city => (
                        <span
                            className="city"
                            onClick={() => this.handleChooseCity(city)}
                            key={city}
                        >
                            <img
                                id={city}
                                className={`city-arm ${this.props.city === city ? 'selected' : 'not-selected'}`}
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    city: state.city,
})

const mapDispatchToProps = dispatch => ({
    selectCity: city => dispatch(selectCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCity);
