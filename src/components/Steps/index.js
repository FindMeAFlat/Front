import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';

import ScrollMouseIcon from './../ScrollMouseIcon';
import SelectCityStep from './SelectCity';
import SearchStep from './Search';
import CriteriaStep from './Criteria';
import MapStep from './Map';

class Steps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                React.createRef(),
                React.createRef(),
                React.createRef(),
                React.createRef(),
            ],
            map: false,
        };
    }

    scrollTo =
        ref => (ref.current
            ? scrollToComponent(ref.current, {
                offset: -50,
                align: 'top',
                duration: 1000,
            })
            : {});

    isComponentToShow = (name) => {
        switch (name) {
        case 'Choose your job/school address':
            return this.props.city.name;
        case 'Choose additional criteria':
            return !!this.props.city.localization;
        case 'Map':
            return !!this.props.criteria;
        default:
            return true;
        }
    };

    displayMap = () => {
        this.setState({
            map: true,
        });
    };

    render() {
        const steps = [
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
        ];

        if (this.state.map) {
            steps.push({
                name: 'Map',
                component: MapStep,
            });
        }

        return (

            <div className="step-container">
                <ReactTooltip />
                {steps.filter(({ name }, index) => this.isComponentToShow(name)).map(({ name, component: StepComponent }, index) => {
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
                                    <ScrollMouseIcon />
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
                                { name === 'Choose additional criteria' ? <span className="map-button" onClick={this.displayMap}>SHOW MAP</span> : null}
                            </div>
                            {nextStep && (
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
