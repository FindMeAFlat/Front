import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { saveCity } from './../../actions';

class CityChooser extends Component {
    static propTypes = {
      saveCity: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
    };

    state = {
      cities: ['Wrocław', 'Warszawa'],
      city: '',
    };

    handleSubmitCity = () => {
      this.props.saveCity(this.state.city);
      this.setState({ city: '' });
      this.props.history.push('/search');
    };

    handleChooseCity = city => (() => this.setState({ city }));

    render() {
      const { city } = this.state;

      return (
        <div className="dark-background">
          <div className="chooser-wrapper">
                    Choose city
            {this.state.cities.map(item => (
              <div
                aria-selected={item === city}
                role="option"
                key={item}
                tabIndex={0}
                onClick={this.handleChooseCity(item)}
                className={classNames(
                  'chooser-element',
                  { selected: item === city },
                )}
              >
                {item}
              </div>
                        ))}
          </div>
          <button
            disabled={this.state.city === ''}
            onClick={this.handleSubmitCity}
          >
                    Select
          </button>
        </div>
      );
    }
}


const mapDispatchToProps = dispatch => ({
  saveCity: city => dispatch(saveCity(city)),
});

export default connect(null, mapDispatchToProps)(CityChooser);
