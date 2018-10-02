import React from 'react';
import { Select } from './../../../../Select';

import 'react-input-range/lib/css/index.css';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

class Distance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPlaceType: null,
            data: { distance: 0, unit: 'm' },
        };
    }

    createLabel = type => type.split('_').map(s => `${s.charAt(0).toUpperCase()}${s.substring(1)}`).join(' ');

    handleChooseType = ({ value }) => {
        const { selectedPlaceType, data } = this.state;
        this.setState({ selectedPlaceType: value, data: selectedPlaceType !== value ? { distance: 0, unit: 'm' } : data });
    }

    handleDistancePickerChange = (data) => {
        this.setState({ data });
    }

    render() {
        const placeTypes = ['accounting', 'airport', 'amusement_park', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'cafe', 'campground', 'car_dealer', 'car_rental', 'car_repair', 'car_wash', 'casino', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store', 'courthouse', 'dentist', 'department_store', 'doctor', 'electrician', 'electronics_store', 'embassy', 'fire_station', 'florist', 'funeral_home', 'furniture_store', 'gas_station', 'gym', 'hair_care', 'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'insurance_agency', 'jewelry_store', 'laundry', 'lawyer', 'library', 'liquor_store', 'local_government_office', 'locksmith', 'lodging', 'meal_delivery', 'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'moving_company', 'museum', 'night_club', 'painter', 'park', 'parking', 'pet_store', 'pharmacy', 'physiotherapist', 'plumber', 'police', 'post_office', 'real_estate_agency', 'restaurant', 'roofing_contractor', 'rv_park', 'school', 'shoe_store', 'shopping_mall', 'spa', 'stadium', 'storage', 'store', 'subway_station', 'supermarket', 'synagogue', 'taxi_stand', 'train_station', 'transit_station', 'travel_agency', 'veterinary_care', 'zoo'];

        return (
            <div className="distance">
                <Select
                    className="select"
                    placeholder="Select type of place..."
                    onChange={this.handleChooseType}
                    options={placeTypes.map(type => ({
                        value: type,
                        label: this.createLabel(type),
                    }))}
                />
                {this.state.selectedPlaceType && <DistancePicker value={this.state.data} onChange={this.handleDistancePickerChange} />}
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
    console.log(props);

    const unitOption = distanceUnits.find(u => u.label === unit);
    console.log('dpicker', value);

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
