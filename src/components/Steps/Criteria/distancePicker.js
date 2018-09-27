import React from 'react';
import Select from 'react-select';
import InputRange from 'react-input-range';

class DistancePicker extends React.Component {
  render() {
    const distanceUnits = [
      { value: 'metres', label: 'm', max: 5000, step: 50, },
      { value: 'kilometres', label: 'km', max: 50, step: 1 },
      { value: 'miles', label: 'mi', max: 30, step: 1 },
    ];

    const { value: { unit, distance }, onChange } = this.props;
    const unitOption = distanceUnits.find(u => u.label === unit);

    return (
      <div className='distance-picker'>
        <InputRange
          maxValue={unitOption.max}
          minValue={0}
          step={unitOption.step}
          value={distance}
          onChange={d => onChange({ unit, distance: d })} />
        <Select value={unitOption} options={distanceUnits} onChange={(u) => this.props.onChange({ unit: u.label, distance: 0 })} />
      </div>
    );
  }
}

export default DistancePicker;