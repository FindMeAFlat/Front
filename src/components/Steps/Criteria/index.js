import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CollapsibleList from './collapsible';
import Custom from './custom';
import Distance from './distance';
import { CreatableSelect } from './../../Select';
import Error from './../../Error';
import saveCriteria from './../../../actions/criteria';

const criteriaTypes = ['distance', 'custom'];

export class Criteria extends Component {
    static getDefaultData(type) {
        switch (type) {
        case 'distance': return {
            distance: 0,
            selectedPlaceType: null,
            importance: 1,
        };
        case 'custom': return {
            url: '',
            propertyAccess: '',
            maxRatingValue: null,
            importance: 0,
            ascending: true,
        };
        default: return {};
        }
    }

    static createLabel(type) {
        return type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');
    }

    static validate = ({ criteria }) => criteria && criteria.length > 0
        && criteria.every(({ type, data }) => {
            if (type === 'distance') {
                const { distance, selectedPlaceType, importance } = data;
                return distance > 0 && selectedPlaceType
                    && importance > 0 && importance <= 100;
            }
            if (type === 'custom') {
                const {
                    url, propertyAccess, maxRatingValue, importance, ascending,
                } = data;
                return url && propertyAccess && maxRatingValue > 0
                    && importance > 0 && importance <= 100 && ascending !== undefined;
            }

            return true;
        });

    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
    }

    handleNewCriteria = (type) => {
        const { criteria, saveCriteria: saveCriteriaProp } = this.props;
        criteria.push({ type: type.value, data: Criteria.getDefaultData(type.value) });
        saveCriteriaProp(criteria);
        if (!this.state.touched) {
            this.setState({ touched: true });
        }
    };

    updateCriteria = (i, data) => {
        const { criteria, saveCriteria: saveCriteriaProp } = this.props;
        criteria[i].data = { ...criteria[i].data, ...data };
        saveCriteriaProp(criteria);
    }

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
        const selectedCriteria = this.props.criteria.map((criteria, i) => {
            switch (criteria.type) {
            case 'distance': return { id: i, title: 'Distance', content: <Distance data={criteria.data} updateCriteriaData={data => this.updateCriteria(i, data)} /> };
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
                    {(this.props.validated || this.state.touched)
                        && !Criteria.validate(this.props) && (
                        (this.props.criteria.length === 0 && <Error msg="You have to select at least one criteria..." />)
                        || <Error msg="Some criteria are incorrectly filled..." />
                    ) }
                </div>
                <button className="button generate-map" onClick={this.renderMap}>Generate map</button>
            </React.Fragment>
        );
    }
}

Criteria.propTypes = {
    criteria: PropTypes.arrayOf({
        type: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }).isRequired,
    validated: PropTypes.bool,
    saveCriteria: PropTypes.func.isRequired,
    activateNext: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
};

Criteria.defaultProps = {
    validated: false,
};

const mapStateToProps = state => ({
    criteria: state.criteria,
    city: state.city,
});

const mapDispatchToProps = dispatch => ({
    saveCriteria: criteria => dispatch(saveCriteria(criteria)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Criteria);
