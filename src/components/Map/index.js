import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Area from './Area';

class Map extends Component {
    render() {
        return (
            <div className='map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_PLACES_KEY }}
                    defaultCenter={{lat: this.props.city.localisation.latitude,
                        lng: this.props.city.localisation.longitude}}
                    defaultZoom={11}
                >
                    <Area
                        lat={this.props.city.localisation.latitude}
                        lng={this.props.city.localisation.longitude}
                        importance={0}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

export default connect(mapStateToProps, null)(Map);
