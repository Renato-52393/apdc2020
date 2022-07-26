import React, { Component } from 'react';
import Category from './categories';

import './FormP.css';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  if (rest.username.length === 0 || rest.password.length === 0 || rest.confirmPassword.length === 0) {
    valid = false;
  }
  console.log(valid);
  return valid;
}

export class FormProfile extends Component {
  constructor() {
    super();
    this.state = { data: false }
  }

  componentDidMount() {
    let url = "https://apdc-fasebeta.appspot.com/profile/";
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("user")

      }
    }).then((result) => {
      result.json()
        .then((resp) => {
          this.setState({ data: resp })
        })
    })
  }

  continue = e => {
    e.preventDefault();

    const request = {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("user")

      },
      body: JSON.stringify({

        //userId: this.props.values.email,
        username: this.props.values.username,
        password: this.props.values.password,
        confirmPassword: this.props.values.confirmPassword,
        address: this.props.values.address,
        zipcode: this.props.values.zipcode,
        /*dateofbirth: this.props.values.dateofbirth,
        gender: this.props.values.gender,
        phone: this.props.values.phone,*/
      })
    };
    fetch('https://apdc-fasebeta.appspot.com/profile/update', request)
      .then(async response => {
        console.log(request.headers)
        console.log(request.body)
        if (response.ok) {
          console.log("hellllloooooo")
          console.log("profile" + request.body);
          if (formValid(this.props.values)) {
            console.log("Changes saved")
          }
          console.log("correu bem")
        }
        else {
          console.log("Something went wrong")
        }
      })
  };

  back = e => {
    e.preventDefault();
  };


  render() {
    const { values, handleChange } = this.props;
    const data = this.state.data;
    console.log(data);

    return (
      <div className='profile-container1'>
        <form className='profile' onSubmit={this.continue}>
          <div className='grid-container'>
            <div className='profile-inputs'>
              <label className='profile-label'>Volunteer</label>
              <input
                className='profile-input'
                type='text'
                name='username'
                placeholder='Name'
                onChange={handleChange('username')}
                defaultValue={data.username}
              />
              {values.formErrors.username.length > 0 && (<p className='p'>{values.formErrors.username}</p>)}
            </div>
            <div className='profile-inputs'>
              <label className='profile-label'>Email</label>
              <input
                className='profile-input'
                type='email'
                name='email'
                placeholder='Email'
                defaultValue={data.userId}
              />
            </div></div>
          <div className='grid-container'>
            <div className='profile-inputs'>
              <label className='profile-label'>Password</label>
              <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange('password')}

              /></div>
            <div className='profile-inputs'>
              <label className='profile-label'>Confirm Password</label>
              <input
                className='profile-input'
                type='password'
                name='confirmPassword'
                placeholder='Confirm your password'
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
            </div>
          </div>
          <div className='grid-container'>
            <div className='profile-inputs'>
              <label className='profile-label'>Date of Birth</label>
              <input
                className='profile-input'
                type='date'
                name='dateofbirth'
              //onChange={handleChange('dateofbirth')}
              //defaultValue={values.dateofbirth}
              />
            </div>
            <div className='profile-inputs'>
              <label className='profile-label'>Gender</label>
              <select name="gender" id="gender" className='profile-input'>
                <option value="gender">Female</option>
                <option value="gender">Male</option>
                <option value="gender">Other</option>
              </select>
            </div>
          </div>
          <div className='grid-container2'>
            <div className='profile-inputs'>
              <label className='profile-label'>Phone</label>
              <input
                className='profile-input'
                type='text'
                name='phone'
                placeholder='Phone Number'
              //onChange={handleChange('phone')}
              //defaultValue={values.phone}
              />
            </div>
            <div className='profile-inputs'>
              <label className='profile-label'>Address</label>
              <input
                className='profile-input'
                type='text'
                name='address'
                placeholder='Address'
                onChange={handleChange('address')}
                defaultValue={data.address}
              />
            </div>
            <div className='profile-inputs'>
              <label className='profile-label'>Zip-Code</label>
              <input
                className='profile-input'
                type='text'
                name='zipcode'
                placeholder='0000-000'
                onChange={handleChange('zipcode')}
                defaultValue={data.zipcode}
              />
            </div>
          </div>
          <div className='checkbox-wrapper'>
            <label className='profile-label'>Choose your favorite Categories</label>
            <div><input type="checkbox" id="cat1" name="cat1" value="category" />
            <label className='profile-label' for="cat1"> Animals</label></div>
            <div><input type="checkbox" id="cat2" name="cat2" value="category" />
            <label className='profile-label' for="cat2"> Children</label></div>
            <div><input type="checkbox" id="cat3" name="cat3" value="category" />
            <label className='profile-label' for="cat3"> Donation</label></div>
          </div>
          <div className='checkbox-wrapper1'>
            <div><input type="checkbox" id="cat4" name="cat4" value="category" />
            <label className='profile-label' for="cat4"> Elders</label></div>
            <div><input type="checkbox" id="cat5" name="cat5" value="category" />
            <label className='profile-label' for="cat5"> Food</label></div>
            <div><input type="checkbox" id="cat6" name="cat6" value="category" />
            <label className='profile-label' for="cat6"> Hospital</label></div>
          </div>
          <button className='save-btn' label='Save' type='submit' value="Submit">Save</button>

        </form>

      </div>


    );
  }
};

export default FormProfile;
/*<input
                className='profile-input'
                type='dropdown-pages'
                name='gender'
                placeholder='Gender'
                //onChange={handleChange('gender')}
                //defaultValue={values.gender}
              />*/