import React, { Component } from 'react';
//import Axios from 'axios';
import '../SignUpForm/Form.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const formValid = rest => {
    let valid = true;

    if (rest.email.length === 0 && rest.password.length === 0) {
        valid = false;
    }

    console.log(valid);

    return valid;
}

export class LoginForm extends Component {

    state = {
        loading: false
    }


    continue = e => {
        e.preventDefault();

        const request = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({

                userId: this.props.values.email,

                password: this.props.values.password

            })
        };
        this.setState({ loading: true });
        fetch('https://apdc-fasebeta.appspot.com/login', request).then( async response =>response.json())
            .then( response => {
                console.log("YYYYYYYYYY" + response)
                if (response!=null) {
                    if (formValid(this.props.values)) {
                        this.props.nextStep();
                    }

                    localStorage.setItem('user', response.tokenID);
                    console.log(this.props.values.email);
                   
                    console.log(response.tokenID)
                    
                    
                }
                else {
                    console.log("Something went wrong")
                    console.log(response)
                }
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 30000)

            }).catch(error => console.error('Error', error))
    };

    render() {
        const { values, handleChange } = this.props;
        const { loading } = this.state;

        return (

            <div className='form-content-right'>
                <form className='form' onSubmit={this.continue}>

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
                        {this.props.values.email.length === 0 && <p className="p">Email required</p>}
                    </div>

                    <div className='form-inputs'>
                        <label className='form-label'>Password</label>
                        <input
                            className='form-input'
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            onChange={handleChange('password')}
                            defaultValue={values.password}
                        />
                        {this.props.values.password.length === 0 && <p className="p">Password required</p>}
                    </div>

                    <button className='form-input1-btn' label='Confirm' type='submit' disabled={loading}>
                        {!loading && <span>Confirm</span>}
                        {loading && <CircularProgress className="buttonProgress" />}
                    </button>

                    {(this.props.values.email.length === 0 || this.props.values.password.length === 0) && (<p className="p">Please fill the missing entries</p>)}

                    <span className='form-input-login'>
                        Don't have an account? Signup <a href='/signup'>here</a>
                    </span>
                </form>
            </div>
        );
    }

}


export default LoginForm;
