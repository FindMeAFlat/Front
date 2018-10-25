import React from 'react';
import PropTypes from 'prop-types';

const Area = (props) => {
    const color = {
        0: 'green',
        1: 'orange',
        2: 'red',
    };

    return (
        <div className={`map-area map-area-${color[props.importance]}`} />
    );
};

Area.propTypes = {
    importance: PropTypes.number.isRequired,
};

export default Area;
