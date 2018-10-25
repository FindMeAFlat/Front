import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import InputRange from 'react-input-range';

import Errors from './../../../const/errors';

class CustomCriteria extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            url: PropTypes.string.isRequired,
            propertyAccess: PropTypes.string.isRequired,
            maxRatingValue: PropTypes.number.isRequired,
            importance: PropTypes.number.isRequired,
            ascending: PropTypes.number.isRequired,
        }).isRequired,
        updateCriteriaData: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            urlError: null,
            propertyAccessError: null,
            maxRatingValueError: null,
        };
    }

    validateUrl = (value) => {
        function checkUrl(url) {
            try { new URL(url); } catch (e) { return false; }
            return url.indexOf('${lat}') !== -1 && url.indexOf('${lon}') !== -1;
        }

        if (!value) return Errors.criteria.mustBeFilled;

        return !checkUrl(value) ? Errors.criteria.url : null;
    };

    validatePropertyAccess = (value) => {
        if (!value) return Errors.criteria.mustBeFilled;
        return new RegExp(/^\s*\S+\s*$/g).test(value) === false ? Errors.criteria.propertyAccess : null;
    }

    validateMaxRatingValue = (value) => {
        if (!value) return Errors.criteria.mustBeFilled;

        return Number.isNaN(Number.parseInt(value, 10)) || Number.parseInt(value, 10) < 1
            ? Errors.criteria.maxRatingValue
            : null;
    }

    render() {
        const {
            url, propertyAccess, maxRatingValue, importance, ascending,
        } = this.props.data;
        const { urlError, propertyAccessError } = this.state;

        return (
            <div className="custom">
                <div className="line">
                    <label>Url</label>
                    <input
                        className={classnames('input', { error: urlError })}
                        value={url}
                        data-tip={urlError || ''}
                        onBlur={({ target: { value } }) => {
                            this.setState({ urlError: this.validateUrl(value) });
                        }}
                        onChange={({ target: { value } }) => {
                            this.setState({ urlError: this.validateUrl(value) });
                            this.props.updateCriteriaData({ url: value });
                        }}
                    />
                </div>
                <div className="line">
                    <label>Property access</label>
                    <input
                        className={classnames('input', { error: propertyAccessError })}
                        value={propertyAccess}
                        data-tip={propertyAccessError || ''}
                        onBlur={({ target: { value } }) => {
                            this.setState({
                                propertyAccessError: this.validatePropertyAccess(value),
                            });
                        }}
                        onChange={({ target: { value } }) => {
                            this.setState({
                                propertyAccessError: this.validatePropertyAccess(value),
                            });
                            this.props.updateCriteriaData({ propertyAccess: value });
                        }}
                    />
                </div>
                <div className="line">
                    <label>Max rating value</label>
                    <input
                        className={classnames('input', { error: this.state.maxRatingValueError })}
                        value={maxRatingValue}
                        data-tip={this.state.maxRatingValueError || ''}
                        onBlur={({ target: { value } }) => {
                            this.setState({
                                maxRatingValueError: this.validateMaxRatingValue(value),
                            });
                        }}
                        onChange={({ target: { value } }) => {
                            this.setState({
                                maxRatingValueError: this.validateMaxRatingValue(value),
                            });
                            this.props.updateCriteriaData({ maxRatingValue: value });
                        }}
                    />
                </div>
                <div className="line">
                    <label>Importance</label>
                    <InputRange
                        className="input"
                        minValue={1}
                        maxValue={100}
                        step={1}
                        value={importance}
                        onChange={imp => this.props.updateCriteriaData({ importance: imp })}
                    />
                </div>
                <div className="line">
                    <label>Ascending <input className="input" value={ascending} onChange={({ target: { value } }) => this.props.updateCriteriaData({ ascending: value })} type="checkbox" /></label>
                </div>
                <ReactTooltip type="error" />
            </div>
        );
    }
}

export default CustomCriteria;
