import React, { Component } from 'react';
import '../SignUpForm/Form.css';
import '../NavbarInitial/nav.css'
import LoginForm from './LoginForm'
import HomeUser from '../../Pages/HomePage'
import { Container, Icon } from '../SignUpForm/FormElement'
import logo from '../../Images/logo_web.png'

export class Login extends Component {

  state = {
    step: 1,
    email: '',
    password: '',

  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }


  handleChange = input => e => {
    e.preventDefault();


    this.setState({ [input]: e.target.value })
  }




  render() {
    const { step } = this.state;
    const { username, email, password, confirmPassword, address, zipcode } = this.state
    const values = { username, email, password, confirmPassword, address, zipcode }
    switch (step) {

      case 1:
        return (
          <Container>
            <Icon to="/">
              <img src={logo} className="photo" alt="logo" />
            </Icon>
            <div className='form-container'>
              <div className='form-content-left'>
                <img className='form-img' src='img/img-2.png' alt='spaceship' />
              </div>
              <LoginForm
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}

              />
            </div>
          </Container>
        );
      case 2:
        return (
          <HomeUser />

        );
      default:
        break;
    }
  }
};

export default Login;