import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';

import { saveLocalization, saveAddress } from '../../../actions/cities';
import Error from './../../Error';

export class Search extends Component {
    static validate = ({ city }) => city && city.address && city.localization;

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
    }

    handleSelect = (selected) => {
        geocodeByAddress(selected)
            .then(results => getLatLng(results[0]))
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

    drawInputField = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="search-bar-container">
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
                <PlacesAutocomplete
                    value={address}
                    onChange={addr => this.props.saveAddress(addr)}
                    onSelect={this.handleSelect}
                >
                    {this.drawInputField}
                </PlacesAutocomplete>
                {(this.props.validated || this.state.touched) && !Search.validate(this.props) && <Error msg="You have to choose correct address..." />}
            </Fragment>
        );
    }
}

Search.propTypes = {
    city: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    validated: PropTypes.bool,
    saveLocalization: PropTypes.func.isRequired,
    saveAddress: PropTypes.func.isRequired,
    activateNext: PropTypes.func.isRequired,
};

Search.defaultProps = {
    validated: false,
};

const mapStateToProps = state => ({
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    saveLocalization: localization => dispatch(saveLocalization(localization)),
    saveAddress: address => dispatch(saveAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
