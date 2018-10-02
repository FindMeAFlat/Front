import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreatableSelect } from './../../Select';

import CollapsibleList from './collapsible';
import StepNavigator from './../../StepNavigator';
import Custom from './custom';
import Distance from './distance';

export class Criteria extends Component {
    constructor(props) {
        super(props);

        this.criteriaTypes = ['distance', 'custom'];
        this.state = {
            criteriaData: props.criteria,
        };
    }

    onDistancePickerChange = (data, criteriaValue) => {
        const { criteriaData } = this.state;
        criteriaData[criteriaValue].value = data;
        this.setState({ criteriaData });
    }

    handleCriteriaSelect = (type) => {
        const { criteriaData } = this.state;
        criteriaData.push({ type: type.value });
        this.setState({ criteriaData });
    };

    handleCriteriaRemove = (index) => {
        const { criteriaData } = this.state;
        criteriaData.splice(index, 1);
        this.setState({ criteriaData });
    }

    createLabel = type => type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');

    saveCriteria = () => {

    }

    render() {
        const selectedCriteria = this.state.criteriaData.map((criteria, i) => {
            switch (criteria.type) {
                case 'distance': return { id: i, title: 'Distance', content: <Distance /> };
                case 'custom': return { id: i, title: 'Custom', content: <Custom /> };
                default: return <div>cos poszlo nie tak</div>;
            }
        });

        return (
            <div className="criteria">
                <StepNavigator stepNumber={3} stepLabel="Choose additional criterias" prevPath="search" prevHandler={this.saveCriteria} nextHandler={this.saveCriteria} />
                <CreatableSelect
                    placeholder="Select from criteria types..."
                    className="select-criteria"
                    isSearchable
                    value={null}
                    options={this.criteriaTypes.map(type => ({ value: type, label: this.createLabel(type) }))}
                    onChange={this.handleCriteriaSelect}
                />
                <CollapsibleList handleRemove={this.handleCriteriaRemove} elements={selectedCriteria} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    criteria: state.criteria,
});

export default connect(mapStateToProps, null)(Criteria);
