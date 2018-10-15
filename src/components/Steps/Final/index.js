import React from 'react';
import { connect } from 'react-redux';
import { post } from 'axios';

class Final extends React.Component {
    savePost = () => {
        const { city, criteria } = this.props;
        post('http://localhost:3000/api/criteria', {
            city,
            criteria,
        })
        console.log(this.props);
    }

    render() {
        return (
            <button onClick={this.savePost}>Send a post</button>
        );
    }
}


const mapStateToProps = state => ({
    city: state.city,
    criteria: state.criteria,
});

export default connect(mapStateToProps, null)(Final);