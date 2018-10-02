import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';

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
    menuList: (styles) => ({
        ...styles,
        maxHeight: '100px',
    })
    // multiValue: styles => ({
    //     ...styles,
    //     padding: '3px 5px',
    //     backgroundColor: 'rgb(117, 159, 235)',
    //     color: 'white',
    // }),
    // multiValueLabel: styles => ({
    //     ...styles,
    //     color: 'white',
    //     marginRight: '20px',
    //     // ':hover': {
    //     //     backgroundColor: 'rgb(90, 112, 235)',
    //     // },
    // }),
    // multiValueRemove: styles => ({
    //     ...styles,
    //     ':hover': {
    //         backgroundColor: 'rgb(90, 112, 235)',
    //     },
    // }),
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
