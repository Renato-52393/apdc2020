import React, { Component } from 'react';

import './Form.css';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  // Object.values(rest).forEach(val => val === '' && (valid =false));
  if (rest.username.length === 0 || rest.email.length === 0 || rest.password.length === 0 || rest.confirmPassword.length === 0) {
    valid = false;
  }
  return valid;
}

export class FormSignup extends Component {

  continue = e => {
    e.preventDefault();
    if (formValid(this.props.values)) {
      this.props.nextStep();

    } else {
      console.log("Please fill out the missing entries")

    }

  };

  render() {
    const { values, handleChange } = this.props;
    console.log("val " + values.formErrors.username)
    console.log(values.username);

    return (
      <div className='form-content-right'>
        <form className='form' noValidate>
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          <div className='form-inputs'>
            <label className='form-label'>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              placeholder='Enter your username'
              onChange={handleChange('username')}
              defaultValue={values.username}
            />

            {values.formErrors.username.length > 0 && (<p className='p'>{values.formErrors.username}</p>)}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
              onChange={handleChange('email')}
              defaultValue={values.email}

            />
            {this.props.values.formErrors.email.length > 0 && (<p className='p'>{this.props.values.formErrors.email}</p>)}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              onChange={handleChange('password')}

            />
            {this.props.values.formErrors.password.length > 0 && (<p className='p'>{this.props.values.formErrors.password}</p>)}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Confirm Password</label>
            <input
              className='form-input'
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}



            />
            {this.props.values.formErrors.confirmPassword.length > 0 && (<p>{this.props.values.formErrors.confirmPassword}</p>)}
          </div>
          <button className='form-input-btn' label='Continue' onClick={this.continue}>Continue

          </button>
          {(this.props.values.username.length === 0 || this.props.values.email.length === 0 || this.props.values.password.length === 0 || this.props.values.confirmPassword.length === 0) && (<p className="p">Please fill the missing entries</p>)}
          <span className='form-input-login'>
            Already have an account? Login <a href='/login'>here</a>
          </span>
        </form>
      </div>


    );
  }
};

export default FormSignup;