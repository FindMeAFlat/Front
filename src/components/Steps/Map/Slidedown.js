import React from 'react';
import PropTypes from 'prop-types';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const Slidedown = (props) => {
    const {
        title, data, active, onClick,
    } = props;
    return (
        <div className="slidedown-container">
            <span
                onClick={onClick}
            >
                {title}
            </span>
            <SlideDown closed={!active} className="my-dropdown-slidedown">
                {data}
            </SlideDown>
        </div>
    );
};

Slidedown.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.element).isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Slidedown;
