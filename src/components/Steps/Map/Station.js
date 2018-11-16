import React from 'react';
import { PropTypes } from 'prop-types';
import { FaBus } from 'react-icons/fa';

const Station = props => (
    <FaBus className="map-area-bus" style={props.style} onClick={props.onClick} />
);

Station.propTypes = {
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Station;
