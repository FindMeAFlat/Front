import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollapsibleList from './collapsible';
import DistancePicker from './distancePicker';
import Select from 'react-select';
import 'react-input-range/lib/css/index.css';


import StepNavigator from './../../StepNavigator';

export class Criteria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {}
      // bankDistance: { distance: 0, unit: 'm' },
      // shoppingCenterDistance: { distance: 0, unit: 'm' },
    };
  }

  render() {
    console.log(this.state);

    const predefinedCriteria = [{ type: 'distance', value: 'bank', label: 'Bank' }, { type: 'distance', value: 'shoppingCenter', label: 'Shopping center' }, { type: 'distance', value: 'hospital', label: 'Hospital' }];

    const notChosenCriteria = predefinedCriteria.filter(criteria => this.state.criteria[criteria.value] === undefined);
    const predefinedElements = Object.values(this.state.criteria).map((criteria) => {
      console.log('criteria', criteria);
      if (criteria.type === 'distance') return { id: criteria.value, title: criteria.label, content: <DistancePicker value={this.state.criteria[criteria.value]} onChange={(criteria) => { const newState = { criteria: { ...this.state.criteria, } }; newState.criteria[criteria.value] = criteria; this.setState(newState); }} />, }
    })

    console.log(predefinedElements)

    // const distanceElements = [
    //   { id: 1, title: 'Bank', content: <DistancePicker value={this.state.bankDistance} onChange={(bankDistance) => { this.setState({ bankDistance }); }} />, },
    //   { id: 2, title: 'Shopping center', content: <DistancePicker value={this.state.shoppingCenterDistance} onChange={(shoppingCenterDistance) => { this.setState({ shoppingCenterDistance }); }} />, },
    // ]

    return (
      <div>
        <StepNavigator stepNumber={3} stepLabel="Choose additional criterias" prevPath="search" />
        <Select isMulti options={notChosenCriteria} onChange={(cr) => { const newCriteria = this.state.criteria; newCriteria[cr.value] = cr; this.setState({ criteria: newCriteria }) }} />

        <CollapsibleList elements={predefinedElements} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(Criteria);
