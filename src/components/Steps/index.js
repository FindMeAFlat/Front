import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import scrollToComponent from 'react-scroll-to-component';

import ScrollMouseIcon from './../ScrollMouseIcon';

import SelectCityStep from './SelectCity';
import SearchStep from './Search';
import CriteriaStep from './Criteria';
import MapStep from './Map';

import resetAll from './../../actions/reset';

const headerOffset = -50;
const scrollingDuration = 1000;

class Steps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                {
                    name: 'Choose city',
                    component: SelectCityStep,
                },
                {
                    name: 'Choose your job/school address',
                    component: SearchStep,
                },
                {
                    name: 'Choose additional criteria',
                    component: CriteriaStep,
                },
            ].map(step => ({
                ...step,
                ref: React.createRef(),
                active: false,
                errors: [],
            })),
            map: false,
        };

        this.state.steps[0].active = true;
    }

    componentDidUpdate(_prevProps, prevState) {
        const oldActiveSteps = prevState.steps.filter(step => step.active);
        const newActiveSteps = this.state.steps.filter(step => step.active);

        if (newActiveSteps.length && oldActiveSteps.length !== newActiveSteps.length) {
            this.scrollTo(this.state.steps[newActiveSteps.length - 1]);
        }
    }

    setErrors = (index, errors) => {
        const { steps } = this.state;
        steps[index].errors = errors;
        this.setState({ steps });
    };

    validate = () => this.state.steps.map(step => step.component.validate(this.props))
        .filter(stepError => stepError);

    activateStep = (index) => {
        if (index === 3) {
            const steps = this.state.steps.map(step => ({ ...step, active: false }));
            this.setState({ steps, map: true });
        } else if (!this.state.steps[index].active) {
            const steps = this.state.steps.map(step => ({ ...step }));
            steps[index].active = true;
            this.setState({ steps, map: false });

            if (index === 0) {
                this.props.resetAll();
            }
        }
    };

    scrollTo = ({ ref }) => (ref.current
        ? scrollToComponent(ref.current, {
            offset: headerOffset,
            align: 'top',
            duration: scrollingDuration,
        })
        : {});

    render() {
        const { steps, map } = this.state;
        return (
            <div className="step-container">
                <ReactTooltip />
                {steps.map((step, index) => ({ step, index })).filter(({ step }) => step.active)
                    .map(({ step: { name, component: StepComponent }, index }) => {
                        const prevStep = steps[index - 1];
                        const nextStep = steps[index + 1];

                        return (
                            <div
                                className="step"
                                ref={steps[index].ref}
                                key={`step_${index}`}
                            >
                                {prevStep && prevStep.active && (
                                    <div
                                        className="navigator"
                                        onClick={() => this.scrollTo(prevStep)}
                                    >
                                        <ScrollMouseIcon />
                                    </div>
                                )}
                                <div className="step-header">{name}</div>
                                <div className="step-content">
                                    <StepComponent
                                        activateNext={() => this.activateStep(index + 1)}
                                        setErrors={errors => this.setErrors(index, errors)}
                                        validate={this.validate}
                                    />
                                </div>
                                {nextStep && nextStep.active && (
                                    <div
                                        className="navigator"
                                        onClick={() => this.scrollTo(nextStep)}
                                    >
                                        <ScrollMouseIcon />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                {map && (
                    <MapStep
                        activateNext={() => this.activateStep(0)}
                    />
                )}
            </div>
        );
    }
}

Steps.propTypes = {
    resetAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    city: state.city,
    criteria: state.criteria,
});

const mapDispatchToProps = dispatch => ({
    resetAll: () => dispatch(resetAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Steps);
