import React from 'react';

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

export default Area;
