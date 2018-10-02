import React from 'react';

import { Form, Text, Checkbox } from 'react-form';

class NewCustomCriteria extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenType: null,
        };
    }

    validateUrl = (value) => {
        function checkUrl(url) {
            try { new URL(url); } catch (e) { return false; }
            return url.indexOf("${lat}") !== -1 && url.indexOf("${lon}") !== -1;
        }

        return {
            error: !value || !checkUrl(value) ? "Url is not valid or doesn't contain ${lat} and ${lon}" : null,
        };
    };

    validatePropertyAccess = (value) => {
        return {
            error: new RegExp(/^\s*\S+\s*$/g).test(value) === false ? "Property access must be strings separated by dot (e.g. 'prop1.prop2.prop3')" : null
        };
    }

    validateMaxRatingValue = (value) => {
        return {
            error: !value || isNaN(value) || parseInt(value) < 1 ? 'Importance must be a positive number' : null
        };
    }

    validateImportance = (value) => {
        return {
            error: !value || isNaN(value) || parseInt(value) < 1 || parseInt(value) > 100 ? 'Importance must be a number from range 1-100' : null
        };
    }

    createForm = (name, field, InputComponent, validate) => (
        <Form>
            {formApi => (
                <form className="form" onSubmit={formApi.submitForm}>
                    <div>
                        <label className="name">{name}</label>
                        <InputComponent className="input" field={field} validate={validate ? validate : () => ({})} />
                    </div>
                    {formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors[field]}</label>}
                </form>
            )}
        </Form>
    );

    render() {
        return (
            <div className="custom">
                {this.createForm('Url', 'urlTemplate', Text, this.validateUrl)}
                {this.createForm('Property access', 'propertyAccess', Text, this.validatePropertyAccess)}
                {this.createForm('Max rating value', 'maxRatingValue', Text, this.validateMaxRatingValue)}
                {this.createForm('Importance', 'importance', Text, this.validateImportance)}
                {this.createForm('Ascending', 'ascending', Checkbox)}
            </div>
        );
    }
}

export default NewCustomCriteria;

// const x = {
//     urlTemplate: string, //has to be js template with x & y properties e.g. "https://someapi.com/${lat}/${lon}"
//     rating: {
//       propertyAccess: string, //has to be sequence of nested objects properties separated with dot e.g. "propA.propB.propC"
//       maxRatingValue: number, //maximum value of rating - needed to map this value to 1-100
//     },
//     importance: number, //value to set importance level of this api for user (1-100)
//     userId?: number, //if no userId, then it's standard api
//     ascending?: boolean, //defines if bigger is better (default: true)
// }
