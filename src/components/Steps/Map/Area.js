import React from 'react';
import PropTypes from 'prop-types';

const Area = props => (
    <div
        style={props.style}
        className={`map-area map-area-${props.importance}`}
        onClick={props.onClick}
    />
);

Area.propTypes = {
    importance: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Area;
