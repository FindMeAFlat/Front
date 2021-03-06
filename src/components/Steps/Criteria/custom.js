import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import classnames from 'classnames';
import InputRange from 'react-input-range';
import axios from 'axios';

import { CreatableSelect } from './../../Select';
import Errors from './../../../const/errors';

class CustomCriteria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            urlError: null,
            requestsLimitError: null,
            propertyAccessError: null,
            minRatingValueError: null,
            maxRatingValueError: null,
            customApis: [],
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/criteria`, {
            params: {
                userId: this.props.userId,
            },
        })
            .then(({ data: { customApis } }) => {
                this.setState({
                    customApis,
                });
            });
    }

    validateUrl = (value) => {
        function checkUrl(url) {
            try { new URL(url); } catch (e) { return false; }
            return url.indexOf('${lat}') !== -1 && url.indexOf('${lon}') !== -1;
        }

        if (!value) return Errors.criteria.mustBeFilled;

        return !checkUrl(value) ? Errors.criteria.url : null;
    };

    validateRequestsLimit = (value) => {
        if (!value) return null;

        return Number.isNaN(Number.parseInt(value, 10)) || Number.parseInt(value, 10) < 51
            ? Errors.criteria.requestsLimit
            : null;
    }

    validatePropertyAccess = (value) => {
        if (!value) return Errors.criteria.mustBeFilled;
        return new RegExp(/^\s*\S+\s*$/g).test(value) === false ? Errors.criteria.propertyAccess : null;
    }

    validateMinRatingValue = (value) => {
        if (!value) return Errors.criteria.mustBeFilled;

        return Number.isNaN(Number.parseInt(value, 10)) ||
            Number.parseInt(value, 10) >= this.props.data.maxRatingValue
            ? Errors.criteria.minRatingValue
            : null;
    }

    validateMaxRatingValue = (value) => {
        if (!value) return Errors.criteria.mustBeFilled;

        return Number.isNaN(Number.parseInt(value, 10)) ||
            Number.parseInt(value, 10) <= this.props.data.minRatingValue
            ? Errors.criteria.maxRatingValue
            : null;
    }

    handleCustomApiChoose = ({ label, __isNew__ }) => {
        const { url, propertyAccess, maxRatingValue } = this.props.data;
        if (__isNew__) {
            const errors = {
                urlError: this.validateUrl(url),
                propertyAccessError: this.validatePropertyAccess(propertyAccess),
                maxRatingValueError: this.validateMaxRatingValue(maxRatingValue),
            };
            this.setState(errors);
            if (!errors.urlError && !errors.propertyAccessError && !errors.maxRatingValueError) {
                axios.post(`${process.env.REACT_APP_API_URL}/api/criteria`, {
                    userId: this.props.userId,
                    name: label,
                    customApi: this.props.data,
                })
                    .then(() => {
                        this.setState({
                            customApis: [...this.state.customApis, {
                                name: label, customApi: this.props.data,
                            },
                            ],
                        });
                    })
                    .catch(() => { });
            }
        } else {
            this.props.updateCriteriaData(this.state.customApis
                .filter(({ name }) => name === label)[0].customApi);
        }
    };

    render() {
        const {
            url,
            propertyAccess,
            minRatingValue,
            maxRatingValue,
            ascending,
            importance,
            requestsLimit,
        } = this.props.data;
        const { customApis, urlError, propertyAccessError } = this.state;

        return (
            <div className="custom">
                {this.props.userId && (<CreatableSelect
                    placeholder="Select from previous criteria or add a new one..."
                    isSearchable
                    value={null}
                    options={customApis.map(({ name }) => ({
                        value: name,
                        label: name,
                    }))}
                    onChange={this.handleCustomApiChoose}
                />)}
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
                    <label>Rating value</label>
                    <div className="rating">
                        <span>Min <input
                            type="number"
                            className={classnames('input', { error: this.state.minRatingValueError })}
                            value={minRatingValue}
                            data-tip={this.state.minRatingValueError || ''}
                            onBlur={({ target: { value } }) => {
                                this.setState({
                                    minRatingValueError: this.validateMinRatingValue(value),
                                });
                            }}
                            onChange={({ target: { value } }) => {
                                this.setState({
                                    minRatingValueError: this.validateMinRatingValue(value),
                                });
                                this.props.updateCriteriaData({ minRatingValue: value });
                            }}
                        />
                        </span>
                        <span>Max <input
                            type="number"
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
                        </span>
                        <span>Ascending <input className="input" value={ascending} onChange={({ target: { value } }) => this.props.updateCriteriaData({ ascending: value })} type="checkbox" /></span>
                    </div>
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
                    <label>Limit of requests per second (Optional)</label>
                    <input
                        type="number"
                        className={classnames('input', { error: this.state.requestsLimitError })}
                        value={requestsLimit}
                        data-tip={this.state.requestsLimitError || ''}
                        onBlur={({ target: { value } }) => {
                            this.setState({
                                requestsLimitError: this.validateRequestsLimit(value),
                            });
                        }}
                        onChange={({ target: { value } }) => {
                            this.setState({
                                requestsLimitError: this.validateRequestsLimit(value),
                            });
                            this.props.updateCriteriaData({ requestsLimit: value });
                        }}
                    />
                </div>
                <ReactTooltip type="error" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.userId,
});

CustomCriteria.propTypes = {
    data: PropTypes.shape({
        url: PropTypes.string.isRequired,
        propertyAccess: PropTypes.string.isRequired,
        minRatingValue: PropTypes.string.isRequired,
        maxRatingValue: PropTypes.string.isRequired,
        ascending: PropTypes.bool.isRequired,
        importance: PropTypes.number.isRequired,
        requestsLimit: PropTypes.string.isRequired,
    }).isRequired,
    updateCriteriaData: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(CustomCriteria);
