import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle, FaMinusCircle, FaTrash } from 'react-icons/fa';

class CollapsibleList extends React.Component {
    static propTypes = {
        elements: PropTypes.arrayOf(PropTypes.object).isRequired,
        handleRemove: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            expanded: -1,
        };
    }

    getExpandIcon = expanded => (expanded
        ? <FaMinusCircle className="icon" color="rgb(117, 159, 235)" size="1em" />
        : <FaPlusCircle className="icon" color="rgb(117, 159, 235)" size="1em" />);

    render() {
        const { expanded } = this.state;
        return (
            <div className="collapsible-list">
                {this.props.elements.map((elem, i) => (
                    <div className="collapsible" key={`collapsible-${i}`}>
                        <div className="expand" onClick={() => this.setState({ expanded: expanded !== i ? i : -1 })}>
                            <span>{elem.title}</span>
                            <span>{this.getExpandIcon(expanded === i)} <FaTrash onClick={() => this.props.handleRemove(i)} className="icon" color="rgb(232, 34, 34)" size="1em" /></span>
                        </div>
                        {expanded === i && (
                            <div className="expanded">
                                {elem.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default CollapsibleList;
