import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import StepNavigator from './../StepNavigator';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      latitude: null,
      longitude: null,
    };
  }

  handleChange = (address) => {
    this.setState({
      address,
    });
  };

  handleSelect = (selected) => {
    geocodeByAddress(selected)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          address: selected,
          latitude: lat,
          longitude: lng,
        });
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
    const { address } = this.state;
    return (
      <div>
        <StepNavigator stepNumber={2} stepLabel="Choose your job/school address" prevPath="/" nextPath="criteria" />
        <PlacesAutocomplete
          value={address}
          onChange={this.handleChange}
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

export default connect(mapStateToProps, null)(Search);
