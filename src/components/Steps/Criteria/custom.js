import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text, Checkbox } from 'react-form';
import Errors from './../../../const/errors';

class CustomCriteria extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            url: PropTypes.string.isRequired,
            propertyAccess: PropTypes.string.isRequired,
            maxRatingValue: PropTypes.number.isRequired,
            importance: PropTypes.number.isRequired,
            ascending: PropTypes.number.isRequired,
        }).isRequired,
        updateCriteriaData: PropTypes.func.isRequired,
    };

    validateUrl = (value) => {
        function checkUrl(url) {
            try { new URL(url); } catch (e) { return false; }
            return url.indexOf('${lat}') !== -1 && url.indexOf('${lon}') !== -1;
        }

        return {
            error: !value || !checkUrl(value) ? Errors.criteria.url : null,
        };
    };

    validatePropertyAccess = value => ({ error: new RegExp(/^\s*\S+\s*$/g).test(value) === false ? Errors.criteria.propertyAccess : null });

    validateMaxRatingValue = value => ({ error: !value || Number.isNaN(value) || Number.parseInt(value, 10) < 1 ? Errors.criteria.maxRatingValue : null });

    validateImportance = value => ({ error: !value || Number.isNaN(value) || Number.parseInt(value, 10) < 1 || Number.parseInt(value, 10) > 100 ? Errors.criteria.importance : null });

    render() {
        const {
            url, propertyAccess, maxRatingValue, importance, ascending,
        } = this.props.data;

        return (
            <div className="custom">
                <Form onChange={formState => this.props.updateCriteriaData(formState.values)}>
                    {formApi => (
                        <form className="form" onSubmit={formApi.submitForm}>
                            <div className="form-line">
                                <div className="form-input">
                                    <label className="name">Url</label>
                                    <Text className="input" field="url" defaultValue={url} validate={this.validateUrl} />
                                </div>
                                {formApi.touched.url && formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors.url}</label>}
                            </div>
                            <div className="form-line">
                                <div className="form-input">
                                    <label className="name">Property access</label>
                                    <Text className="input" field="propertyAccess" defaultValue={propertyAccess} validate={this.validatePropertyAccess} />
                                </div>
                                {formApi.touched.propertyAccess && formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors.propertyAccess}</label>}
                            </div>
                            <div className="form-line">
                                <div className="form-input">
                                    <label className="name">Max rating value</label>
                                    <Text className="input" field="maxRatingValue" defaultValue={maxRatingValue} validate={this.validateMaxRatingValue} />
                                </div>
                                {formApi.touched.maxRatingValue && formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors.maxRatingValue}</label>}
                            </div>
                            <div className="form-line">
                                <div className="form-input">
                                    <label className="name">Importance</label>
                                    <Text className="input" field="importance" defaultValue={importance} validate={this.validateImportance} />
                                </div>
                                {formApi.touched.importance && formApi.getFormState().errors && <label className="error">{formApi.getFormState().errors.importance}</label>}
                            </div>
                            <div className="form-line">
                                <div className="form-input">
                                    <label className="name">Ascending</label>
                                    <Checkbox className="input" field="ascending" defaultValue={ascending} validate={() => ({})} />
                                </div>
                            </div>
                        </form>
                    )}
                </Form>
            </div>
        );
    }
}

export default CustomCriteria;
