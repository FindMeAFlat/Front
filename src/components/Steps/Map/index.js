import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Area from './Area';

const RADIUS = 200;
const DEFAULT_ZOOM = 11;

class MapStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            roadsLoaded: false,
            active: 0,
            zoom: DEFAULT_ZOOM,
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
                this.getNearestStreet(response.data);
            });
    }

    getNearestStreet = (stations) => {
        const promises = stations.map(({ stop }) =>
            axios.post(`${process.env.REACT_APP_API_URL}/api/roads`, {
                station: [stop.coordinates.lat, stop.coordinates.lon],
                radius: RADIUS,
            }));
        Promise.all(promises).then((response) => {
            const { name } = this.props.city;
            const normalizedCityName = name
                .replace('ł', 'l').replace('Ł', 'L').normalize('NFKD').replace(/[^\w]/g, '');
            const url = `https://www.olx.pl/nieruchomosci/mieszkania/${normalizedCityName}/q-`;

            const areaInfos = response.map(resp => resp.data.map((street, streetIndex) => (
                <a
                    key={`link_${streetIndex}`}
                    href={url + street.split(' ').join('-')}
                    className="offer-url"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {`olx.pl/${name}/${street.split(' ').join('-')}`}
                </a>
            )));

            this.createAreaLinks = () => areaInfos[this.state.active];
            this.setState({ roadsLoaded: true });
        });
    };

    displayStops = () => {
        const { active, stations, zoom } = this.state;
        const radius = (2 ** (zoom < 17 ? Math.max(14, zoom) : 17)) / 1500;

        return stations.map(({ stop, name }, index) => {
            const finalRadius = index === active ? 2 * radius : radius;
            return (<Area
                key={`area_${index}`}
                style={{
                    height: `${finalRadius}px`,
                    width: `${finalRadius}px`,
                    left: `-${finalRadius / 2}px`,
                    top: `-${finalRadius / 2}px`,
                }}
                lat={stop.coordinates.lat}
                lng={stop.coordinates.lon}
                importance={index}
                onClick={() => this.showAreaInfo(index)}
                title={`stop: '${name}'`}
            />);
        });
    }

    displayActiveStopPlaces = () => {
        const { stations, active, zoom } = this.state;
        const radius = (2 ** (zoom < 16 ? Math.max(13, zoom) : 16)) / 1500;

        return stations[active].data
            .filter(d => d.distance !== undefined)
            .flatMap(({ places }) => places.map(({
                icon, name, distance, location: { lat, lng },
            }) => (
                <img
                    src={icon}
                    lat={lat}
                    lng={lng}
                    style={{
                        height: `${radius}px`,
                        left: `-${radius / 4}px`,
                        top: `-${radius / 2}px`,
                    }}
                    title={`name: '${name}' distance: ${parseInt(1000 * distance, 10)}m`}
                    alt={`name: '${name}' distance: ${parseInt(1000 * distance, 10)}m`}
                />
            )));
    }

    createResults = () => {
        const stationData = this.state.stations[this.state.active].data;
        return stationData.map((sd) => {
            if (sd.distance) {
                const { selectedPlaceType, distance, places } = sd;
                const closestPlaceDistance = places
                    .map(p => parseInt(1000 * p.distance, 10)).sort()[0];
                return closestPlaceDistance
                    ? `Closest ${selectedPlaceType}: ${closestPlaceDistance}m (expected: ${distance}m)`
                    : `No ${selectedPlaceType} closer than ${distance}m`;
            }
            const { finalRating, maxRatingValue, url } = sd;
            return `'...${url.split('/')[2]}...': ${finalRating} (max: ${maxRatingValue})`;
        });
    }

    showAreaInfo = (id) => {
        if (this.state.active !== id) {
            this.setState({
                active: id,
            });
        }
    };

    render() {
        const { stations, active } = this.state;
        const { lat, lng } = this.props.city.localization;

        if (!stations.length) {
            return (
                <div className="loader">
                    <Loader
                        type="ThreeDots"
                        color="#759FEB"
                        height="100"
                        width="100"
                    />
                </div>
            );
        }

        return (
            <React.Fragment>
                <button
                    className="button back-button"
                    onClick={this.props.activateNext}
                >
                    Start again
                </button>
                <div className="map-container">
                    <div className="map">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY }}
                            defaultCenter={{
                                lat,
                                lng,
                            }}
                            defaultZoom={this.state.zoom}
                            onBoundsChange={(_center, zoom) => {
                                this.setState({ zoom });
                            }}
                        >
                            {this.displayStops()}
                            {this.displayActiveStopPlaces()}
                        </GoogleMapReact>
                    </div>
                    <div className="area-info">
                        <div className={`area-navigator a${active}`}>
                            <span onClick={() => this.setState({ active: (9 + active) % 10 })}>
                                <FaArrowLeft className="icon" color="#759FEB" size="1em" />
                            </span>
                            Area {active + 1}
                            <span onClick={() => this.setState({ active: (active + 1) % 10 })}>
                                <FaArrowRight className="icon" color="#759FEB" size="1em" />
                            </span>
                        </div>
                        <div className="area-details">
                            <React.Fragment>
                                <div className="results">
                                    <p>Results</p>
                                    <ul>
                                        {this.state.stations &&
                                            this.createResults().map(res => <li>{res}</li>)
                                        }
                                    </ul>
                                </div>

                                <div className="links">
                                    {!this.state.roadsLoaded && (
                                        <div className="loader"><Loader type="ThreeDots" color="#759FEB" height="100" width="100" /></div>
                                    )}
                                    {this.state.roadsLoaded && ((
                                        this.createAreaLinks().length && (
                                            <React.Fragment>
                                                <p>Links</p>
                                                {this.createAreaLinks()}
                                            </React.Fragment>
                                        ))
                                        || (!this.createAreaLinks().length &&
                                            <p>No links for this area</p>
                                        )
                                    )}
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

MapStep.propTypes = {
    criteria: PropTypes.arrayOf(PropTypes.object).isRequired,
    city: PropTypes.shape({
        localization: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    activateNext: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

export default connect(mapStateToProps, null)(MapStep);
