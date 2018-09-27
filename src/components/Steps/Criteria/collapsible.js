import React from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

class Collapsible extends React.Component {
  getIcon() {
    return this.props.expanded
      ? <FaMinusCircle className='icon' color={"rgb(117, 159, 235)"} size={"1.5em"} />
      : <FaPlusCircle className='icon' color={"rgb(117, 159, 235)"} size={"1.5em"} />;
  }

  render() {
    return (
      <div className='collapsible'>
        <div className='expand' onClick={this.props.onExpand}>
          <span>{this.props.title}</span>{this.getIcon()}
        </div>
        {this.props.expanded &&
          <div className='expanded'>
            {this.props.content}
          </div>
        }
      </div>
    )
  }
}

class CollapsibleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: -1,
    }
  }

  render() {
    return (
      <div className='collapsible-list'>
        {this.props.elements.map((elem, i) =>
          <Collapsible title={elem.title} content={elem.content} expanded={i === this.state.expanded} onExpand={() => this.setState({ expanded: this.state.expanded !== i ? i : -1 })} />
        )}
      </div>
    )

  }
}

export default CollapsibleList;