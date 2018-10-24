import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Area from './Area';
import Station from './Station';

const RADIUS = 4;
const DEFAULT_ZOOM = 11;

class MapStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            streetsInAreas: [],
        };
    }

    componentDidMount() {
        const { lat, lng } = this.props.city.localization;
        const { city, criteria } = this.props;
        axios.post(`${process.env.REACT_APP_API_URL}/api/stations`, {
            target: {
                lat,
                lon: lng,
            },
            city: city.name,
            radius: RADIUS,
            criteria,
        })
            .then((response) => {
                this.setState({
                    stations: response.data,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getNearestStreet = (stations) => {
        const promises = stations.map(station =>
            axios.post(`${process.env.REACT_APP_API_URL}/api/roads`, {
                station: [station.coordinates.lat, station.coordinates.lon],
                radius: RADIUS,
            }));
        Promise.all(promises).then((response) => {
            this.setState({
                streetsInAreas: response.map(area => area.data),
            });
        });
    };

    prepareStationsIcons = () => this.state.stations.map(station => (
        <Station lat={station.coordinates.lat} lng={station.coordinates.lon} />
    ));


    displaySearchLinks = areas => areas.map(area => area.map(street => <span>https://www.olx.pl/nieruchomosci/mieszkania/wroclaw/q-{street.split(' ').join('-')}</span>));

    render() {
        const { stations } = this.state;
        const { lat, lng } = this.props.city.localization;
        return (
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY }}
                    defaultCenter={{
                        lat,
                        lng,
                    }}
                    defaultZoom={DEFAULT_ZOOM}
                >
                    <Area
                        lat={lat}
                        lng={lng}
                        importance={0}
                    />
                    {stations.length && this.prepareStationsIcons()}
                </GoogleMapReact>
            </div>
        );
    }
}

MapStep.propTypes = {
    criteria: PropTypes.arrayOf({
        type: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }).isRequired,
    city: PropTypes.shape({
        localization: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

MapStep.validate = () => true;

export default connect(mapStateToProps, null)(MapStep);
