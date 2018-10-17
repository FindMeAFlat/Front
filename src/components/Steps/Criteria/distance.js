import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { Form, Text } from 'react-form';

import 'react-input-range/lib/css/index.css';

import { Select } from './../../Select';
import Errors from './../../../const/errors';
import PlaceTypes from './../../../const/placeTypes';

class Distance extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            distance: PropTypes.shape({
                distance: PropTypes.number.isRequired,
                unit: PropTypes.string.isRequired,
            }).isRequired,
            selectedPlaceType: PropTypes.string.isRequired,
            importance: PropTypes.number.isRequired,
        }).isRequired,
        updateCriteriaData: PropTypes.func.isRequired,
    };

    createLabel = type => type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');

    handleChooseType = ({ value }) => {
        const { selectedPlaceType, distance } = this.props.data;
        this.props.updateCriteriaData({
            selectedPlaceType: value,
            distance: selectedPlaceType !== value ? { distance: 0, unit: 'm' } : distance,
        });
    };

    handleDistancePickerChange = (data) => {
        this.props.updateCriteriaData({ distance: data });
    };

    handleImportanceChange = (data) => {
        this.props.updateCriteriaData({ importance: data });
    };

    validateImportance = value => ({
        error:
            !value || Number.isNaN(value) || Number.parseInt(value, 10) < 1
                || Number.parseInt(value, 10) > 100
                ? Errors.criteria.importance
                : null,
    });

    render() {
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
                    options={PlaceTypes.map(type => ({
                        value: type,
                        label: this.createLabel(type),
                    }))}
                    value={selectValue}
                />
                {selectedPlaceType && (
                    <React.Fragment>
                        <DistancePicker
                            value={distance}
                            onChange={this.handleDistancePickerChange}
                        />
                        <Form onChange={formState => this.handleImportanceChange(formState.values.importance)}>
                            {formApi => (
                                <form className="form" onSubmit={formApi.submitForm}>
                                    <div className="form-line">
                                        <div className="form-input">
                                            <label className="name">Importance</label>
                                            <Text className="input" field="importance" defaultValue={importance} validate={this.validateImportance} />
                                        </div>
                                        {formApi.touched.importance && formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors.importance}</label>}
                                    </div>
                                </form>
                            )}
                        </Form>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function DistancePicker(props) {
    const distanceUnits = [
        {
            value: 'metres', label: 'm', max: 5000, step: 50,
        },
        {
            value: 'kilometres', label: 'km', max: 50, step: 1,
        },
        {
            value: 'miles', label: 'mi', max: 30, step: 1,
        },
    ];

    const { value, onChange } = props;
    const unit = value ? value.unit : 'm';
    const distance = value ? value.distance : 0;
    const unitOption = distanceUnits.find(u => u.label === unit);

    return (
        <div className="distance-picker">
            <InputRange
                maxValue={unitOption.max}
                minValue={0}
                step={unitOption.step}
                value={distance}
                onChange={d => onChange({ unit, distance: d })}
            />
            <Select
                value={unitOption}
                options={distanceUnits}
                onChange={u => onChange({ unit: u.label, distance: 0 })}
            />
        </div>
    );
}

DistancePicker.propTypes = {
    value: PropTypes.objectOf({
        unit: PropTypes.string.isRequired,
        distance: PropTypes.number.isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Distance;
