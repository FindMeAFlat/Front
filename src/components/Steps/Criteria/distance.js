import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';

import { Select } from './../../Select';
import Errors from './../../../const/errors';
import PlaceTypes from './../../../const/placeTypes';

class Distance extends React.Component {
    createLabel = type => type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');

    handleChooseType = ({ value }) => {
        const { selectedPlaceType, distance } = this.props.data;
        this.props.updateCriteriaData({
            selectedPlaceType: value,
            distance: selectedPlaceType === value ? distance : 0,
        });
    };

    handleDistancePickerChange = (distance) => {
        this.props.updateCriteriaData({ distance });
    };

    handleImportanceChange = (importance) => {
        this.props.updateCriteriaData({ importance });
    };

    validateImportance = value => ({
        error:
            !value || Number.isNaN(value) || Number.parseInt(value, 10) < 1
                || Number.parseInt(value, 10) > 100
                ? Errors.criteria.importance
                : null,
    });

    render() {
        const maxDistance = 1000;
        const step = 25;

        const { distance, selectedPlaceType, importance } = this.props.data;
        const selectValue = selectedPlaceType ? {
            value: selectedPlaceType,
            label: this.createLabel(selectedPlaceType),
        } : null;

        return (
            <div className="distance">
                <Select
                    className="select"
                    placeholder="Select type of place..."
                    onChange={this.handleChooseType}
                    options={PlaceTypes
                        .filter(placeType => this.props.alreadySelectedPlaceTypes
                            .indexOf(placeType) < 0)
                        .map(type => ({
                            value: type,
                            label: this.createLabel(type),
                        }))
                    }
                    value={selectValue}
                />
                {selectedPlaceType && (
                    <React.Fragment>
                        <label>Distance</label>
                        <InputRange
                            minValue={0}
                            maxValue={maxDistance}
                            step={step}
                            value={distance || 0}
                            onChange={this.handleDistancePickerChange}
                        />
                        <label>Importance</label>
                        <InputRange
                            minValue={1}
                            maxValue={100}
                            step={1}
                            value={importance}
                            onChange={this.handleImportanceChange}
                        />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

Distance.propTypes = {
    data: PropTypes.shape({
        distance: PropTypes.number.isRequired,
        selectedPlaceType: PropTypes.string.isRequired,
        importance: PropTypes.number.isRequired,
    }).isRequired,
    alreadySelectedPlaceTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCriteriaData: PropTypes.func.isRequired,
};

export default Distance;
