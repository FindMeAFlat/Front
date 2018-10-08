import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import axios from 'axios';

import Area from './Area';
import Station from './Station';

class Map extends Component {

    constructor(props) {
      super(props);
      this.state = {
          stations: [],
      }
    }

    componentDidMount() {
          const { latitude, longitude } = this.props.city.localisation;
          const { criteria, city } = this.props;
          axios.post(`${process.env.REACT_APP_API_URL}/stations`, {
              target: {
                  lat: latitude,
                  lon: longitude
                },
                city: city.name,
                radius: 4
          })
              .then((response) => {
                  this.setState({
                      stations: response.data
                  });
              })
              .catch((error) => {
                  console.error(error);
              });
    }

    prepareStationsIcons = () => {
        const { stations } = this.state;
        return stations.map((station) => <Station lat={station.coordinates.lon} lng={station.coordinates.lat}/>);
    }

    render() {
      const { stations } = this.state;
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
                  { stations.length > 0 ? this.prepareStationsIcons() : null}
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
