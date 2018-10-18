import React from 'react';
import { PropTypes } from 'prop-types';

export default function Error(props) {
    return (
        <div className="error">{props.msg}</div>
    );
}

Error.propTypes = {
    msg: PropTypes.string.isRequired,
};
