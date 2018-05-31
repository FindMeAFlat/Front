import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: ' Kraków',
      latitude: null,
      longitude: null,
    };
  }

    handleChange = (address) => {
      this.setState({
        address,
        latitude: null,
        longitude: null,
      });
    }

    handleSelect = (selected) => {
      this.setState({ address: selected });
      geocodeByAddress(selected)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          this.setState({
            latitude: lat,
            longitude: lng,
          });
        });
    }


    render() {
      const {
        address,
      } = this.state;

      return (
        <div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            shouldFetchSuggestions={address.length > 3}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
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
                                        const parts = suggestion.description.split(',');
                                        if (parts.includes(this.state.city)) {
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
                    )}
          </PlacesAutocomplete>
        </div>
      );
    }
}
