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
        };

        this.state.steps[0].active = true;
    }

    componentDidUpdate(prevProps, prevState) {
        const oldActiveSteps = prevState.steps.filter(step => step.active);
        const newActiveSteps = this.state.steps.filter(step => step.active);

        if (oldActiveSteps.length !== newActiveSteps.length) {
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
        const steps = this.state.steps.map(step => ({ ...step }));
        if (index === 3) {
            for (let i = 0; i < 3; i += 1) {
                steps[i].active = false;
            }
            steps[3].active = true;
        } else {
            if (index === 0) steps[3].active = false;
            steps[index].active = true;
        }
        this.setState({ steps });
    };

    scrollTo = ({ ref }) => (ref.current
        ? scrollToComponent(ref.current, {
            offset: headerOffset,
            align: 'top',
            duration: scrollingDuration,
        })
        : {});

    render() {
        const { steps } = this.state;
        return (
            <div className="step-container">
                <ReactTooltip />
                {steps.map((step, index) => ({ step, index })).filter(({ step }) => step.active)
                    .map(({ step: { name, component: StepComponent }, index }) => {
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
                                        activateNext={() => this.activateStep((index + 1) % 4)}
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    city: state.city,
    criteria: state.criteria,
});


export default connect(mapStateToProps, null)(Steps);
