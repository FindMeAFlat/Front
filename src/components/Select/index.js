import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

const style = {
    control: styles => ({
        ...styles,
        cursor: 'pointer',
    }),
    option: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? 'rgb(117, 159, 235)' : 'white',
        color: isFocused ? 'white' : 'black',
        cursor: 'pointer',
    }),
    menuList: styles => ({
        ...styles,
        maxHeight: '100px',
    }),
};

function CreatableSelectComponent(props) {
    return (
        <CreatableSelect
            styles={style}
            isSearchable
            {...props}
        />
    );
}

function SelectComponent(props) {
    return (
        <Select
            styles={style}
            isSearchable
            {...props}
        />
    );
}

export { CreatableSelectComponent as CreatableSelect, SelectComponent as Select };
