import React from 'react';
import { FaPlusCircle, FaMinusCircle, FaTrash } from 'react-icons/fa';

function Collapsible(props) {
    const getExpandIcon = () => {
        return props.expanded
            ? <FaMinusCircle className="icon" color="rgb(117, 159, 235)" size="1em" />
            : <FaPlusCircle className="icon" color="rgb(117, 159, 235)" size="1em" />;
    };

    return (
        <div className="collapsible">
            <div className="expand" onClick={props.onExpand}>
                <span>{props.title}</span>
                <span>{getExpandIcon()} <FaTrash onClick={props.handleRemove} className="icon" color="rgb(232, 34, 34)" size="1em" /></span>
            </div>
            {props.expanded &&
                <div className="expanded">
                    {props.content}
                </div>
            }
        </div>
    );
}

class CollapsibleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: -1,
        };
    }

    render() {
        return (
            <div className="collapsible-list">
                {this.props.elements.map((elem, i) =>
                    <Collapsible title={elem.title} handleRemove={() => this.props.handleRemove(i)} content={elem.content} expanded={i === this.state.expanded} onExpand={() => this.setState({ expanded: this.state.expanded !== i ? i : -1 })} />)}
            </div>
        );
    }
}

export default CollapsibleList;
