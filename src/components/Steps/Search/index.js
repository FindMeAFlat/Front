import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';

import Errors from './../../../const/errors';
import { saveLocalization, saveAddress } from '../../../actions/cities';

export class Search extends Component {
    static validate = ({ city }) => (!city.localization || !city.localization.lat || !city.localization.lng ? Errors.search : '');

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
    }

    handleSelect = (selected) => {
        geocodeByAddress(selected)
            .then((results) => {
                if (!results.some(res =>
                    res.address_components.filter(({ long_name: longName }) =>
                        longName.includes(this.props.city.name)).length > 0)) {
                    return { lat: null, lng: null };
                }
                return getLatLng(results[0]);
            })
            .then(({ lat, lng }) => {
                if (!this.state.touched) this.setState({ touched: true });
                this.props.saveLocalization({
                    lat,
                    lng,
                });
                this.props.saveAddress(selected);
                this.props.activateNext();
            });
    };

    handleError = (error) => {
        if (error === 'INVALID_REQUEST' || error === 'ZERO_RESULTS') {
            this.props.saveLocalization(null);
        }
    };

    drawInputField = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className={classnames('search-bar-container', { error: Search.validate(this.props) })}>
            <div className="search-input-container">
                <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                />
            </div>
            {suggestions.length > 0 && (
                <div className="autocomplete-container">
                    {suggestions.map((suggestion) => {
                        const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                        const parts = suggestion.description.split(',').map(part => part.trim());
                        if (parts.includes(this.props.city.name)) {
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, { className })}
                                >
                                    <span><b>{parts[0]}</b></span>
                                    <span>
                                        ,{suggestion.formattedSuggestion.secondaryText}
                                    </span>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );

    render() {
        const { address } = this.props.city;
        return (
            <Fragment>
                <div className="full-width" data-tip={Search.validate(this.props) ? Errors.search : ''}>
                    <PlacesAutocomplete
                        value={address}
                        onChange={addr => this.props.saveAddress(addr)}
                        onSelect={this.handleSelect}
                        onError={this.handleError}
                    >
                        {this.drawInputField}
                    </PlacesAutocomplete>
                </div>
                <ReactTooltip type="error" />
            </Fragment>
        );
    }
}

Search.propTypes = {
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    saveLocalization: PropTypes.func.isRequired,
    saveAddress: PropTypes.func.isRequired,
    activateNext: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    saveLocalization: localization => dispatch(saveLocalization(localization)),
    saveAddress: address => dispatch(saveAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
