import React, { Component} from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormPersonal from  './FormPersonal'
import '../NavbarInitial/nav.css'



import {Container, Icon} from './FormElement'
import logo from '../../Images/logo_web.png'

import FormSuccess from './FormSuccess';


export class Form extends Component{
  
state = {
    step:1,
    username: '',
    email: '',
    password:'',
    confirmPassword:'',
    address:'',
    zipcode:'',
    formErrors:{
      username: '',
      email: '',
      password:'',
      confirmPassword:''
    }
}

nextStep = () =>{
    const {step} = this.state;
    this.setState({
        step: step+1
    });
}
prevStep = () =>{
    const {step} = this.state;
    this.setState({
        step: step-1
    });
}



handleChange = input => e =>{
    e.preventDefault();
  

    let formErrors = this.state.formErrors;
    
    switch(input){

      case 'username':
        //fazer o fetch para verificar se o username já existe
        //console.log(e.target.value.length )
       
        if (e.target.value.length === 0 ) {
          formErrors.username = 'username required';
        } else{
          formErrors.username = '';
        }
        break;
      case 'email':
        if (e.target.value.length === 0) {
          formErrors.email = 'Email required';
        } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
          formErrors.email = 'Email address is invalid';
        }else{
          formErrors.email = '';
        }
          break;
      case 'password':
        if (e.target.value.length === 0) {
          formErrors.password = 'Password is required';
        } else if (e.target.value.length < 6) {
          formErrors.password = 'Password needs to be 6 characters or more';
        }else{
          formErrors.password = '';
        }
        break;
      case 'confirmPassword':
        if (e.target.value.length === 0) {
          formErrors.confirmPassword = 'Password is required';
        } else if (e.target.value!== this.state.password) {
          formErrors.confirmPassword = 'Passwords do not match';
        }
        else{
          formErrors.confirmPassword = '';
          
        }

        break;
      
      default:
        break;
    }
  
    this.setState({[input]:e.target.value})
}

 


render(){
    const {step} = this.state;
    const {username, email, password,confirmPassword, address,zipcode,formErrors} = this.state
    const values = {username, email, password,confirmPassword, address,zipcode,formErrors}
    switch(step){
            
            case 1:
                return (
                    <Container>
                     <Icon to ="/">
                        <img src={logo} className = "photo"  alt="logo" />
                     </Icon>
                      <div className='form-container'>
                        <div className='form-content-left'>
                          <img className='form-img' src='img/img-2.png' alt='spaceship' />
                        </div>
                            <FormSignup 
                                nextStep = {this.nextStep}
                                handleChange = {this.handleChange}
                                values = {values}
                                
                                />
                      </div>
                    </Container>
                  );
            case 2:
                return (
                    <Container>
                    <Icon to ="/">
                       <img src={logo} className = "photo"  alt="logo" />
                    </Icon>
                    
                     <div className='form-container'>
                       <div className='form-content-left'>
                         <img className='form-img' src='img/img-2.png' alt='spaceship' />
                       </div>
                       <FormPersonal 
                                nextStep = {this.nextStep}
                                prevStep = {this.prevStep}
                                handleChange = {this.handleChange}
                                values = {values}
                             
                                />
                       </div>
                   </Container>
                )
            case 3:
                return(
                    <Container>
                    
                    <Icon to ="/">
                       <img src={logo} className = "photo"  alt="logo" />
                    </Icon>
                   
                

              
                     <div className='form-container'>
                       <div className='form-content-left'>
                         <img className='form-img' src='img/img-2.png' alt='spaceship' />
                       </div>
                       <FormSuccess
                                />
                                
                       </div>
                   </Container>

                )
                default:
                  break;
            
    }

 
        }
};

export default Form;