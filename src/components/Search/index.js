import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import './index.css';

class Search extends Component {
    propTypes = {
      history: React.ReactPropTypes.array,
      handleSubmit: React.ReactPropTypes.func,
    };

    handleSubmit = () => {
      this.props.history.push('/');
    };

    renderField = ({
      input, label, placeholder, meta,
    }) => (
      <div>
        <label className="label">{label}</label>
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          size="50"
          {...input}
        />
        <label className="label error">
          {meta.touched ? meta.error : ''}
        </label>
      </div>
    );

    render() {
      return (
        <form className="search" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            label="Your job/school address"
            name="mainAddress"
            placeholder="Enter your job/school address..."
            component={this.renderField}
          />
          <button type="submit" className="button submit">Submit</button>
        </form>
      );
    }
}

function validate(values) {
  const errors = {};

  if (!values.mainAddress) { errors.mainAddress = 'Enter an address of your job/school...'; }

  return errors;
}

export default reduxForm({
  validate,
  form: 'SearchForm',
})(connect(null, { })(Search));


// TODO
/*
class NewPost extends Component{


    render(){
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                    label='Title'
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Categories'
                    name='categories'
                    component={this.renderField}
                />
                <Field
                    label='Content'
                    name='content'
                    component={this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        );
    }
}


*/
