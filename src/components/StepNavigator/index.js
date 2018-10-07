import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function StepNavigator(props) {
    const { nextPath, nextHandler, prevPath, prevHandler, stepNumber, stepLabel } = props;
    return (
        <div className="step-navigator">
            <ReactTooltip/>
            <Link className={`navigator ${prevPath ? '' : 'not-visible'}`} to={prevPath ? prevPath : ''} onClick={prevHandler} >
                <i data-tip="Previous step" className="arrow fa fa-2x fa-arrow-left"/>
            </Link>

            <div className="step-header">
                <span className="label step-number">Step {stepNumber}:</span>
                <span className="label step-label">{stepLabel}</span>
            </div>

            <Link className={`navigator ${nextPath ? '' : 'not-visible'}`} to={nextPath ? nextPath : ''} onClick={nextHandler}>
                <i data-tip="Next step" className="arrow fa fa-2x fa-arrow-right"/>
            </Link>
        </div>
    );
}

export default StepNavigator;
