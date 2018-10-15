import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { saveLocalization, saveAddress } from '../../../actions/cities';

export class Search extends Component {
    static propTypes = {
        city: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
    }

    handleSelect = (selected) => {
        geocodeByAddress(selected)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                this.props.saveLocalization({
                    lat,
                    lng,
                });
                this.props.saveAddress(selected);
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
                    })}
                </div>
            )}
        </div>
    );

    render() {
        const { address } = this.props.city;
        return (
            <div>
                <PlacesAutocomplete
                    value={address}
                    onChange={address => this.props.saveAddress(address)}
                    onSelect={this.handleSelect}
                >
                    {this.drawInputField}
                </PlacesAutocomplete>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    saveLocalization: localization => dispatch(saveLocalization(localization)),
    saveAddress: address => dispatch(saveAddress(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
