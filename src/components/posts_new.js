import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm is very similar to connect function. Its connects 
// formreducer and components
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title:{
    type: 'input',
    label: 'Title for post'
   },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post'
   }, 
  content: {
    type: 'textarea',
    label: 'Post Contents'
   }
};

class PostsNew extends Component {
  renderField(field){
    const { meta: { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const fieldTag = FIELDS[field.input.name];
    return (
      <div className={ className }>
        <label>{ field.label }</label>
        <fieldTag.type
          className="form-control"
          type="text" 
          // this is same as
          // onChange = {field.input.onChange}
          // onFocus = {field.input.onFocus}
          // .....and son 
          {...field.input}        
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={ this.renderField }
        />
        <Field
          label="Post Conent"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'adfaf', categories: 'asdfdf', content:'fadfd'}
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }    
  }); 
  
  //Validate the inputs from 'values'
  // if (!values.title ) {
  //   errors.title = 'Enter a title!';
  // }
  // if (!values.categories) {
  //   errors.categories = 'Enter some categories';
  // }
  // if (!values.content) {
  //   errors.content = 'Enter some content please';
  // }
  //If errors is empty, the form is fine to submit
  //If erros has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);