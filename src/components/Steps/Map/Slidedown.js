import React from 'react';
import PropTypes from 'prop-types';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

const Slidedown = (props) => {
    const {
        title, data, closed, onClick,
    } = props;
    return (
        <div className="slidedown-container">
            <span
                onClick={onClick}
            >
                {title}
            </span>
            <SlideDown closed={closed} className="my-dropdown-slidedown">
                {data}
            </SlideDown>
        </div>
    );
};

Slidedown.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    closed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Slidedown;
