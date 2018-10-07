import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CollapsibleList from './collapsible';
import Custom from './custom';
import Distance from './distance';
import { CreatableSelect } from './../../Select';
import saveCriteria from './../../../actions/criteria';

const criteriaTypes = ['distance', 'custom'];

export class Criteria extends Component {
    static propTypes = {
        criteria: PropTypes.shape({
            type: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired,
        }).isRequired,
        saveCriteria: PropTypes.func.isRequired,
    };

    static getDefaultData(type) {
        switch (type) {
            case 'distance': return {
                distance: {
                    distance: 0,
                    unit: 'm',
                },
                selectedPlaceType: null,
            };
            case 'custom': return {
                url: '',
                propertyAccess: '',
                maxRatingValue: null,
                importance: null,
                ascending: true,
            };
            default: return {};
        }
    }

    static createLabel(type) {
        return type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');
    }

    constructor(props) {
        super(props);

        this.state = {
            criteriaData: props.criteria,
        };
    }

    handleNewCriteria = (type) => {
        const { criteriaData } = this.state;
        criteriaData.push({ type: type.value, data: Criteria.getDefaultData(type.value) });
        this.setState({ criteriaData });
    };

    updateCriteria = (i, data) => {
        const { criteriaData } = this.state;
        criteriaData[i].data = { ...criteriaData[i].data, ...data };
        this.setState({ criteriaData });
    }

    handleRemoveCriteria = (index) => {
        const { criteriaData } = this.state;
        criteriaData.splice(index, 1);
        this.setState({ criteriaData });
    }

    saveCriteria = () => {
        this.props.saveCriteria(this.state.criteriaData);
    }

    render() {
        const selectedCriteria = this.state.criteriaData.map((criteria, i) => {
            switch (criteria.type) {
                case 'distance': return { id: i, title: 'Distance', content: <Distance data={criteria.data} updateCriteriaData={data => this.updateCriteria(i, data)} /> };
                case 'custom': return { id: i, title: 'Custom', content: <Custom data={criteria.data} updateCriteriaData={data => this.updateCriteria(i, data)} /> };
                default: return <div>cos poszlo nie tak</div>;
            }
        });

        return (
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
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
});

const mapDispatchToProps = dispatch => ({
    saveCriteria: criteria => dispatch(saveCriteria(criteria)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);
