import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import axios from 'axios';

import Area from './Area';
import Station from './Station';

const RADIUS = 4;
const DEFAULT_ZOOM = 11;

class MapStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
        };
    }

    prepareStationsIcons = () => {
        const { stations } = this.state;
        return stations.map(station => <Station lat={station.coordinates.lon} lng={station.coordinates.lat} />);
    };

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
                    { stations.length && this.prepareStationsIcons()}
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

export default connect(mapStateToProps, null)(MapStep);
