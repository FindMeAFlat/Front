import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';

import ScrollMouseIcon from './../ScrollMouseIcon';

import SelectCityStep from './SelectCity';
import SearchStep from './Search';
import CriteriaStep from './Criteria';
import MapStep from './Map';

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
                {
                    name: 'Map',
                    component: MapStep,
                },
            ].map(step => ({
                ...step,
                ref: React.createRef(),
                active: false,
                errors: [],
            })),
            validated: false,
        };

        this.activateStep(0);
    }

    componentDidUpdate() {
        const { steps } = this.state;
        const lastActivatedStepIndex = steps.filter(step => step.active).length - 1;
        this.scrollTo(steps[lastActivatedStepIndex]);
    }

    setErrors = (index, errors) => {
        const { steps } = this.state;
        steps[index].errors = errors;
        this.setState({ steps });
    }

    activateStep = (index) => {
        const { steps } = this.state;
        steps[index].active = true;
        this.setState({ steps });
    }

    scrollTo = ({ ref }) => (ref.current
        ? scrollToComponent(ref.current, {
            offset: headerOffset,
            align: 'top',
            duration: scrollingDuration,
        })
        : {});

    validate = () => {
        this.setState({ validated: true });
        const firstErrorStep = this.state.steps
            .filter(step => !step.component.validate(this.props))[0];
        if (firstErrorStep) {
            this.scrollTo(firstErrorStep);
            return false;
        }
        return true;
    };

    render() {
        const { steps, validated } = this.state;
        return (
            <div className="step-container">
                <ReactTooltip />
                {steps.filter(step => step.active)
                    .map(({ name, component: StepComponent }, index) => {
                        const prevStep = this.state.steps[index - 1];
                        const nextStep = this.state.steps[index + 1];

                        return (
                            <div
                                className="step"
                                ref={this.state.steps[index].ref}
                            >
                                {prevStep && (
                                    <div
                                        className="navigator"
                                        onClick={() => this.scrollTo(prevStep)}
                                    >
                                        <ScrollMouseIcon />
                                    </div>
                                )}
                                <div className="step-header">
                                    {name}
                                </div>
                                <div className="step-content">
                                    <StepComponent
                                        activateNext={() => this.activateStep(index + 1)}
                                        setErrors={errors => this.setErrors(index, errors)}
                                        validate={this.validate}
                                        validated={validated}
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    city: state.city,
    criteria: state.criteria,
});


export default connect(mapStateToProps, null)(Steps);
