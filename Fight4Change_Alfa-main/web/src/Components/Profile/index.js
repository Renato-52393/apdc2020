import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ProfileForm from './FormP';
import ProfilePic from './picture';
import './FormP.css';


export class Profile extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    zipcode: '',
    //dateofbirth: '',
    //gender: '',
    //phone: '',
    formErrors: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = input => e => {
    e.preventDefault();

    let formErrors = this.state.formErrors;

    switch (input) {

      case 'username':
        if (e.target.value.length === 0) {
          formErrors.username = 'username required';
        } else {
          formErrors.username = '';
        }
        break;
      case 'password':
        if (e.target.value.length === 0) {
          formErrors.password = 'Password is required';
        } else if (e.target.value.length < 6) {
          formErrors.password = 'Password needs to be 6 characters or more';
        } else {
          formErrors.password = '';
        }
        break;
      case 'confirmPassword':
        if (e.target.value.length === 0) {
          formErrors.confirmPassword = 'Password is required';
        } else if (e.target.value !== this.state.password) {
          formErrors.confirmPassword = 'Passwords do not match';
        }
        else {
          formErrors.confirmPassword = '';

        }

        break;

      default:
        break;
    }

    this.setState({ [input]: e.target.value })
  }

  render() {
    const { username, email, password, confirmPassword, address, zipcode, formErrors } = this.state
    const values = { username, email, password, confirmPassword, address, zipcode, formErrors }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="container-all">
          <div className="profile-wrapper">
            <main className="layout">
              <ProfilePic />
              <Typography component="h1" variant="h4" align="center">
                Profile
              </Typography>
              <React.Fragment>
                <ProfileForm
                  handleChange={this.handleChange}
                  values={values}
                />
              </React.Fragment>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;