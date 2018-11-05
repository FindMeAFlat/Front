import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import Area from './Area';
import Station from './Station';
import Slidedown from './Slidedown';
import CITIES from './../../../const/cities';

const RADIUS = 200;
const DEFAULT_ZOOM = 10;

class MapStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            streetsInAreas: [],
            closed: [],
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
                    closed: Array(response.data.length).fill(true),
                });
                this.getNearestStreet(response.data);
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

    displaySearchLinks = areas => areas.map((area, i) => {
        const { name } = this.props.city;
        const data = area.map(street =>
            (<a
                href={`https://www.olx.pl/nieruchomosci/mieszkania/${CITIES[name]}/q-${street.split(' ').join('-')}`}
                style={{ textDecoration: 'none' }}
                target="_blank"
            >
                https://www.olx.pl/nieruchomosci/mieszkania/{CITIES[name]}/q-{street.split(' ').join('-')}
            </a>));
        return (<Slidedown
            title={`Area  ${i}`}
            data={data}
            closed={this.state.closed[i]}
            onClick={() => this.handleSlideDown(i)}
        />);
    });

    displayAreas = stations => stations.map((station, index) =>
        (<Area
            lat={station.coordinates.lat}
            lng={station.coordinates.lon}
            importance={index}
            onClick={() => this.handleSlideDown(index)}
        />));

    handleSlideDown = (id) => {
        const closed = this.state.closed.slice(0);
        closed[id] = !this.state.closed[id];
        this.setState((prevState) => {
            const tmp = [...prevState.closed];
            tmp[id] = !prevState.closed[id];
            return {
                closed: tmp,
            };
        });
    };

    render() {
        const { streetsInAreas, stations } = this.state;
        const { lat, lng } = this.props.city.localization;
        return (
            <React.Fragment>
                <div className="map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY }}
                        defaultCenter={{
                            lat,
                            lng,
                        }}
                        defaultZoom={DEFAULT_ZOOM}
                    >
                        {this.displayAreas(stations)}
                        {stations.length && this.prepareStationsIcons()}
                    </GoogleMapReact>

                </div>
                {this.displaySearchLinks(streetsInAreas)}
                <button
                    className="button map-button"
                    onClick={this.props.activateNext}
                >
                    Start again
                </button>
            </React.Fragment>
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
        name: PropTypes.string.isRequired,
    }).isRequired,
    activateNext: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

MapStep.validate = () => '';

export default connect(mapStateToProps, null)(MapStep);
