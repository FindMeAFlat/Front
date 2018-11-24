import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import CollapsibleList from './collapsible';
import Custom from './custom';
import Distance from './distance';
import { CreatableSelect } from './../../Select';
import saveCriteria from './../../../actions/criteria';

const criteriaTypes = ['distance', 'custom'];

export class Criteria extends Component {
    static getDefaultData(type) {
        switch (type) {
            case 'distance': return {
                distance: 0,
                selectedPlaceType: '',
                importance: 1,
            };
            case 'custom': return {
                url: '',
                requestsLimit: '',
                propertyAccess: '',
                minRatingValue: '',
                maxRatingValue: '',
                importance: 1,
                ascending: true,
            };
            default: return {};
        }
    }

    static createLabel(type) {
        return type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');
    }

    static validate = ({ criteria }) => {
        if (!criteria || criteria.length === 0) {
            return 'You have to select at least one criteria...';
        }
        if (!criteria.every(({ type, data }) => {
            if (type === 'distance') {
                const { distance, selectedPlaceType, importance } = data;
                return distance > 0 && selectedPlaceType
                    && importance > 0 && importance <= 100;
            }
            if (type === 'custom') {
                const {
                    url,
                    requestsLimit,
                    propertyAccess,
                    minRatingValue,
                    maxRatingValue,
                    importance,
                    ascending,
                } = data;

                return url && (!requestsLimit || requestsLimit > 50)
                    && propertyAccess && maxRatingValue !== ''
                    && minRatingValue !== '' && maxRatingValue > minRatingValue
                    && importance > 0 && importance <= 100 && ascending !== undefined;
            }

            return true;
        })) {
            return 'Some criteria are incorrectly filled...';
        }

        return '';
    }

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
    }

    getGenerateMapButtonDataTip = () => {
        const validateInfo = this.props.validate();
        return validateInfo ? validateInfo.filter(info => !!info).map(info => `${info}<br>`) : '';
    }

    updateCriteria = (i, data) => {
        const { criteria, saveCriteria: saveCriteriaProp } = this.props;
        criteria[i].data = { ...criteria[i].data, ...data };
        saveCriteriaProp(criteria);
    }

    handleNewCriteria = (type) => {
        const { criteria, saveCriteria: saveCriteriaProp } = this.props;
        criteria.push({ type: type.value, data: Criteria.getDefaultData(type.value) });
        saveCriteriaProp(criteria);
        if (!this.state.touched) {
            this.setState({ touched: true });
        }
    };

    handleRemoveCriteria = (index) => {
        const { criteria, saveCriteria: saveCriteriaProp } = this.props;
        criteria.splice(index, 1);
        saveCriteriaProp(criteria);
    }

    renderMap = () => {
        if (this.props.validate()) {
            this.props.activateNext();
        }
    }

    render() {
        const alreadySelectedPlaceTypes = this.props.criteria
            .map(({ data: { selectedPlaceType } }) => selectedPlaceType);
        const selectedCriteria = this.props.criteria.map((criteria, i) => {
            switch (criteria.type) {
                case 'distance': return { id: i, title: 'Distance', content: <Distance alreadySelectedPlaceTypes={alreadySelectedPlaceTypes} data={criteria.data} updateCriteriaData={data => this.updateCriteria(i, data)} /> };
                case 'custom': return { id: i, title: 'Custom', content: <Custom data={criteria.data} updateCriteriaData={data => this.updateCriteria(i, data)} /> };
                default: return null;
            }
        });

        return (
            <React.Fragment>
                <div className="criteria">
                    <CreatableSelect
                        placeholder="Select from criteria types..."
                        className="select-criteria"
                        isSearchable
                        value={null}
                        options={criteriaTypes.map(type => ({
                            value: type,
                            label: Criteria.createLabel(type),
                        }))}
                        onChange={this.handleNewCriteria}
                    />
                    <CollapsibleList
                        handleRemove={this.handleRemoveCriteria}
                        elements={selectedCriteria}
                    />
                </div>
                <button
                    data-tip={this.getGenerateMapButtonDataTip()}
                    className="button map-button"
                    onClick={this.renderMap}
                    disabled={this.props.validate().length > 0}
                >
                    Generate map
                </button>
                <ReactTooltip html type="error" />
            </React.Fragment>
        );
    }
}

Criteria.propTypes = {
    criteria: PropTypes.arrayOf(PropTypes.object).isRequired,
    saveCriteria: PropTypes.func.isRequired,
    activateNext: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    saveCriteria: criteria => dispatch(saveCriteria(criteria)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);
