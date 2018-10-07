import React from 'react';
import ReactTooltip from 'react-tooltip';

import SelectCityStep from './SelectCity';
import SearchStep from './Search';
import CriteriaStep from './Criteria';
import scrollToComponent from 'react-scroll-to-component';

class Steps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                React.createRef(),
                React.createRef(),
                React.createRef()
            ],
        };
    }

    scrollTo =
        ref => ref.current
            ? scrollToComponent(ref.current, {
                offset: -50,
                align: 'top',
                duration: 1000,
            })
            : {};

    render() {
        const steps = [
            {
                name: 'Choose city',
                component: SelectCityStep
            },
            {
                name: 'Choose your job/school address',
                component: SearchStep
            },
            {
                name: 'Choose additional criteria',
                component: CriteriaStep
            },
        ];

        return (
            <div className="step-container">
                <ReactTooltip />
                {steps.map(({ name, component: StepComponent }, index) => {
                    const prevStep = this.state.steps[index - 1];
                    const nextStep = this.state.steps[index + 1];

                    return (
                        <div
                            className="step"
                            ref={this.state.steps[index]}
                        >
                            {prevStep && (
                                <div
                                    className="navigator"
                                    onClick={() => this.scrollTo(prevStep)}
                                >
                                    <i
                                        className="arrow fa fa-2x fa-arrow-up"
                                        data-tip={prevStep.name}
                                    />
                                </div>
                            )}
                            <div className="step-header">
                                {name}
                            </div>
                            <div className="step-content">
                                <StepComponent
                                    scrollToPrev={() => this.scrollTo(prevStep)}
                                    scrollToNext={() => this.scrollTo(nextStep)}
                                />
                            </div>
                            {nextStep && (
                                <div
                                    className="navigator"
                                    onClick={() => this.scrollTo(nextStep)}
                                >
                                    <i
                                        data-tip={nextStep.name}
                                        className="arrow fa fa-2x fa-arrow-down"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Steps;
